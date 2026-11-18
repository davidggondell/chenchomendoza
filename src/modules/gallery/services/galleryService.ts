import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage, ensureAnonymousAuth } from "../../../services/firebase";
import type { ImageItem } from "../../../types";

export interface ResolvedImageMeta {
  url: string;
  width: number;
  height: number;
}

interface QueueTask {
  id: string;
  image: ImageItem;
  priority: number;
  cancelled: boolean;
  onReady: (meta: ResolvedImageMeta) => void;
}

const resolvedCache = new Map<string, ResolvedImageMeta>();
const urlOnlyCache = new Map<string, string>();
const loadQueue: QueueTask[] = [];

const MAX_CONCURRENT_WORKERS = 3;
const REVEAL_STAGGER_MS = 55;

let activeWorkers = 0;
let nextRevealTime = 0;

const scheduleReveal = (fn: () => void): void => {
  const now = performance.now();
  const wait = Math.max(0, nextRevealTime - now);
  nextRevealTime = Math.max(now, nextRevealTime) + REVEAL_STAGGER_MS;

  if (wait === 0) {
    fn();
  } else {
    window.setTimeout(fn, wait);
  }
};

export const getCachedImageMeta = (image: ImageItem): ResolvedImageMeta | undefined => {
  const key = image.storagePath || image.id;
  return resolvedCache.get(key);
};

export const ensureImageUrl = async (image: ImageItem): Promise<string> => {
  if (image.src) return image.src;
  const key = image.storagePath || image.id;
  const cachedUrl = urlOnlyCache.get(key);
  if (cachedUrl) {
    image.src = cachedUrl;
    return cachedUrl;
  }
  if (!image.storagePath) return "";
  await ensureAnonymousAuth();
  const url = await getDownloadURL(ref(storage, image.storagePath));
  urlOnlyCache.set(key, url);
  image.src = url;
  return url;
};

const loadSingleImageMeta = async (image: ImageItem): Promise<ResolvedImageMeta> => {
  const key = image.storagePath || image.id;
  const existing = resolvedCache.get(key);
  if (existing) {
    image.src = existing.url;
    image.width = existing.width;
    image.height = existing.height;
    return existing;
  }

  const url = await ensureImageUrl(image);

  const meta = await new Promise<ResolvedImageMeta>((resolve) => {
    const img = new Image();
    img.decoding = "async";

    const finish = () => {
      const width = img.naturalWidth || img.width || 1200;
      const height = img.naturalHeight || img.height || 800;
      resolve({ url, width, height });
    };

    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };

    img.onerror = () => {
      resolve({ url, width: 1200, height: 800 });
    };

    img.src = url;
  });

  resolvedCache.set(key, meta);
  image.src = meta.url;
  image.width = meta.width;
  image.height = meta.height;
  image.aspectRatio = meta.height / (meta.width || 1);

  return meta;
};

const runWorker = async (): Promise<void> => {
  activeWorkers += 1;

  try {
    while (loadQueue.length > 0) {
      // Always pick the visible card with the lowest priority index (top-to-bottom order)
      loadQueue.sort((a, b) => a.priority - b.priority);
      const task = loadQueue.shift();
      if (!task || task.cancelled) {
        continue;
      }

      try {
        const meta = await loadSingleImageMeta(task.image);
        if (!task.cancelled) {
          scheduleReveal(() => {
            if (!task.cancelled) {
              task.onReady(meta);
            }
          });
        }
      } catch {
        // Ignore individual load errors and continue with the next queued photo
      }
    }
  } finally {
    activeWorkers -= 1;
  }
};

const pumpQueue = (): void => {
  while (activeWorkers < MAX_CONCURRENT_WORKERS && loadQueue.length > 0) {
    void runWorker();
  }
};

export const enqueueGalleryImageLoad = (
  image: ImageItem,
  priority: number,
  onReady: (meta: ResolvedImageMeta) => void
): (() => void) => {
  const key = image.storagePath || image.id;
  const cached = resolvedCache.get(key);
  if (cached) {
    image.src = cached.url;
    image.width = cached.width;
    image.height = cached.height;
    onReady(cached);
    return () => {};
  }

  const task: QueueTask = {
    id: key,
    image,
    priority,
    cancelled: false,
    onReady,
  };

  loadQueue.push(task);
  pumpQueue();

  return () => {
    task.cancelled = true;
    const idx = loadQueue.indexOf(task);
    if (idx !== -1) {
      loadQueue.splice(idx, 1);
    }
  };
};

export const fetchGalleryImages = async (category: string): Promise<ImageItem[]> => {
  await ensureAnonymousAuth();
  const categoryRef = ref(storage, category);
  // Single lightweight call to list files in the folder — no Promise.all over individual files
  const result = await listAll(categoryRef);

  if (!result.items || result.items.length === 0) {
    return [];
  }

  const isPortrait = category === "RETRATO";
  const defaultAspectRatio = isPortrait ? 1.5 : 0.67;

  return result.items.map((itemRef, index) => {
    const rawName = itemRef.name.replace(/\.[^/.]+$/, "");
    const storagePath = itemRef.fullPath;
    const cached = resolvedCache.get(storagePath);

    return {
      id: `${category}-${index}-${rawName}`,
      src: cached ? cached.url : urlOnlyCache.get(storagePath) || "",
      storagePath,
      name: rawName,
      width: cached?.width,
      height: cached?.height,
      aspectRatio: cached ? cached.height / (cached.width || 1) : defaultAspectRatio,
    };
  });
};

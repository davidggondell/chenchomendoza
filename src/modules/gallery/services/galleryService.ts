import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../services/firebase";
import type { ImageItem } from "../../../types";

interface ImageDimension {
  width: number;
  height: number;
}

const getImageDimensions = (url: string, category: string): Promise<ImageDimension> => {
  return new Promise((resolve) => {
    const isPortrait = category === "RETRATO";
    const fallbackDims = {
      width: isPortrait ? 800 : 1200,
      height: isPortrait ? 1200 : 800,
    };

    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth || img.width || fallbackDims.width,
        height: img.naturalHeight || img.height || fallbackDims.height,
      });
    };
    img.onerror = () => {
      resolve(fallbackDims);
    };
    img.src = url;
  });
};

export const fetchGalleryImages = async (category: string): Promise<ImageItem[]> => {
  const categoryRef = ref(storage, category);
  const result = await listAll(categoryRef);

  if (!result.items || result.items.length === 0) {
    return [];
  }

  const itemsWithUrls = await Promise.all(
    result.items.map(async (itemRef, index) => {
      const url = await getDownloadURL(itemRef);
      const dimensions = await getImageDimensions(url, category);
      const rawName = itemRef.name.replace(/\.[^/.]+$/, "");

      const imageItem: ImageItem = {
        id: `${category}-${index}-${rawName}`,
        src: url,
        name: rawName,
        width: dimensions.width,
        height: dimensions.height,
        aspectRatio: dimensions.height / (dimensions.width || 1),
      };

      return imageItem;
    })
  );

  return itemsWithUrls;
};


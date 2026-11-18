import { ref, get } from "firebase/database";
import { database, ensureAnonymousAuth } from "../../../services/firebase";
import type {
  EquipmentCategory,
  AwardItem,
  ExhibitionItem,
  PublicationItem,
  TimelineEvent,
  YearGroup,
  LocalizedText,
  BioData,
} from "../types";

export const getLocalizedText = (value: LocalizedText | undefined, lang: string): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value["es"] || Object.values(value)[0] || "";
};

const mapObjectToArray = <T extends { id?: string; order?: number }>(data: Record<string, T> | null): T[] => {
  if (!data) return [];
  return Object.entries(data).map(([key, item]) => ({
    ...item,
    id: item.id || key,
  }));
};

export const fetchEquipment = async (): Promise<EquipmentCategory[]> => {
  await ensureAnonymousAuth();
  const equipmentRef = ref(database, "equipo");
  const snapshot = await get(equipmentRef);
  if (!snapshot.exists()) return [];

  const raw = snapshot.val();
  const list = Array.isArray(raw) ? (raw.filter(Boolean) as EquipmentCategory[]) : mapObjectToArray<EquipmentCategory>(raw);
  return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

export const fetchBio = async (): Promise<BioData | null> => {
  await ensureAnonymousAuth();
  const bioRef = ref(database, "bio");
  const snapshot = await get(bioRef);
  if (!snapshot.exists()) return null;
  return snapshot.val() as BioData;
};

export const fetchAwards = async (): Promise<AwardItem[]> => {
  await ensureAnonymousAuth();
  const awardsRef = ref(database, "premios");
  const snapshot = await get(awardsRef);
  if (!snapshot.exists()) return [];

  const raw = snapshot.val();
  const list = Array.isArray(raw) ? (raw.filter(Boolean) as AwardItem[]) : mapObjectToArray<AwardItem>(raw);
  return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

export const fetchExhibitions = async (): Promise<ExhibitionItem[]> => {
  await ensureAnonymousAuth();
  const exposRef = ref(database, "exposiciones");
  const snapshot = await get(exposRef);
  if (!snapshot.exists()) return [];

  const raw = snapshot.val();
  const list = Array.isArray(raw) ? (raw.filter(Boolean) as ExhibitionItem[]) : mapObjectToArray<ExhibitionItem>(raw);
  return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

export const fetchPublications = async (): Promise<PublicationItem[]> => {
  await ensureAnonymousAuth();
  const pubRef = ref(database, "publicaciones");
  const snapshot = await get(pubRef);
  if (!snapshot.exists()) return [];

  const raw = snapshot.val();
  const list = Array.isArray(raw) ? (raw.filter(Boolean) as PublicationItem[]) : mapObjectToArray<PublicationItem>(raw);
  return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

export const groupTimelineEventsByYear = (events: TimelineEvent[]): YearGroup[] => {
  const sorted = [...events].sort((a, b) => {
    const yearA = parseInt(a.year, 10);
    const yearB = parseInt(b.year, 10);
    const hasYearA = !Number.isNaN(yearA);
    const hasYearB = !Number.isNaN(yearB);

    if (hasYearA && hasYearB) {
      if (yearB !== yearA) return yearB - yearA; // Descending: newest first
    } else if (hasYearA !== hasYearB) {
      return hasYearA ? -1 : 1; // Dated items come before undated items
    }

    return (a.order ?? 0) - (b.order ?? 0);
  });

  const groupsMap = new Map<string, TimelineEvent[]>();
  for (const event of sorted) {
    const yearKey = event.year ? String(event.year) : "";
    if (!groupsMap.has(yearKey)) {
      groupsMap.set(yearKey, []);
    }
    groupsMap.get(yearKey)!.push(event);
  }

  const grouped: YearGroup[] = [];
  groupsMap.forEach((items, year) => {
    grouped.push({ year, items });
  });

  return grouped;
};

export const fetchTrajectoryTimeline = async (): Promise<TimelineEvent[]> => {
  const [awards, expos, publications] = await Promise.all([
    fetchAwards(),
    fetchExhibitions(),
    fetchPublications(),
  ]);

  const allEvents: TimelineEvent[] = [
    ...awards.map((a) => ({
      id: a.id,
      year: a.year ? String(a.year) : "",
      order: a.order ?? 0,
      category: "award" as const,
      isAward: true,
      type: "award",
      title: a.title,
      image: a.image,
    })),
    ...expos.map((e) => ({
      id: e.id,
      year: e.year ? String(e.year) : "",
      order: e.order ?? 0,
      category: "expo" as const,
      isAward: false,
      type: e.type || "expo",
      title: e.title,
      image: e.image,
    })),
    ...publications.map((p) => ({
      id: p.id,
      year: p.year ? String(p.year) : "",
      order: p.order ?? 0,
      category: "publication" as const,
      isAward: false,
      type: p.tag || "editorial",
      title: p.title,
      image: p.image,
    })),
  ];

  return allEvents;
};

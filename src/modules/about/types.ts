export type LocalizedText = string | { [key: string]: string };

export interface EquipmentCategory {
  id: string;
  order?: number;
  icon: string;
  title: LocalizedText;
  items: string[];
}

export interface AwardItem {
  id: string;
  order?: number;
  year: string;
  isAward?: boolean;
  title: LocalizedText;
  image?: string;
}

export interface ExhibitionItem {
  id: string;
  order?: number;
  year: string;
  type?: string; // "expo" | "project"
  title: LocalizedText;
  image?: string;
}

export interface PublicationItem {
  id: string;
  order?: number;
  year?: string;
  tag?: string; // "press" | "guide" | "editorial" | "institutional"
  title: LocalizedText;
  image?: string;
}

export type TimelineCategory = "award" | "expo" | "publication";

export interface TimelineEvent {
  id: string;
  year: string;
  order: number;
  category: TimelineCategory;
  isAward: boolean;
  type: string; // "award" | "expo" | "project" | "press" | "guide" | "editorial" | "institutional"
  title: LocalizedText;
  image?: string;
}

export interface YearGroup {
  year: string;
  items: TimelineEvent[];
}

export interface BioData {
  title?: LocalizedText;
  paragraph1?: LocalizedText;
  paragraph2?: LocalizedText;
  paragraph3?: LocalizedText;
  portraitImage?: string;
  panoramicImage?: string;
}

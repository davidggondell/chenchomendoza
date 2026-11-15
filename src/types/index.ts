export type Language = "es" | "gl" | "en";

export type GalleryCategory = "INICIO" | "PAISAJE" | "NATURALEZA" | "RETRATO" | "DEPORTES" | "OTROS";

export interface ImageItem {
  id: string;
  src: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: number;
}

export interface EquipmentItem {
  id: string;
  icon: string;
  items: string[];
  negativeMargin?: boolean;
}

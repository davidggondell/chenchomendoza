import { useQuery } from "@tanstack/react-query";
import { fetchGalleryImages } from "../services/galleryService";
import type { ImageItem } from "../../../types";

export const useGalleryImages = (category: string) => {
  return useQuery<ImageItem[], Error>({
    queryKey: ["gallery", category],
    queryFn: () => fetchGalleryImages(category),
    staleTime: 1000 * 60 * 15, // Cache valid for 15 minutes
    gcTime: 1000 * 60 * 60, // Keep in memory for 1 hour
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

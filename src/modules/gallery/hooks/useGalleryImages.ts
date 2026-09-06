import { useQuery } from '@tanstack/react-query';
import { fetchGalleryImages } from '../services/galleryService';
import type { ImageItem } from '../../../types';

export const useGalleryImages = (category: string) => {
  return useQuery<ImageItem[], Error>({
    queryKey: ['gallery', category],
    queryFn: () => fetchGalleryImages(category),
    staleTime: 0, // Cache disabled for testing
    gcTime: 0, // Cache disabled for testing
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

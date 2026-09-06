import React from 'react';
import { useGalleryImages } from '../hooks/useGalleryImages';
import { ImageGrid } from '../components/ImageGrid';
import { GallerySkeleton } from '../components/GallerySkeleton';
import { ErrorAlert } from '../../common/components/ErrorAlert';
import { useLanguage } from '../../../i18n';
import type { GalleryCategory } from '../../../types';

interface GalleryPageProps {
  category: GalleryCategory;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ category }) => {
  const { data: images, isLoading, isError, error } = useGalleryImages(category);
  const { t } = useLanguage();

  if (isLoading) {
    return <GallerySkeleton category={category} />;
  }

  if (isError) {
    return (
      <ErrorAlert
        severity="error"
        message={`${t('project.error.galleryError')} ${error?.message || ''}`}
      />
    );
  }

  if (!images || images.length === 0) {
    return (
      <ErrorAlert
        severity="warning"
        message={t('project.error.emptyGallery')}
      />
    );
  }

  return <ImageGrid images={images} category={category} />;
};

export default GalleryPage;

import React from 'react';
import { Box, Typography } from '@mui/material';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { useLanguage, type MessageKey } from '../../../i18n';

interface PublicationItem {
  nameKey: MessageKey;
  tagKey: MessageKey;
  icon: React.ReactNode;
  image?: string; // Slot ready for cover/preview image
}

export const PublicationsSection: React.FC = () => {
  const { t } = useLanguage();

  const publicationsList: PublicationItem[] = [
    {
      nameKey: 'project.aboutme.publication3', // Revista Elle
      tagKey: 'project.aboutme.tag.press',
      icon: <ArticleOutlinedIcon fontSize="medium" />,
    },
    {
      nameKey: 'project.aboutme.publication4', // Guía de viajes de EL PAÍS
      tagKey: 'project.aboutme.tag.guide',
      icon: <ExploreOutlinedIcon fontSize="medium" />,
    },
    {
      nameKey: 'project.aboutme.publication5', // Grupo Prisa
      tagKey: 'project.aboutme.tag.press',
      icon: <ArticleOutlinedIcon fontSize="medium" />,
    },
    {
      nameKey: 'project.aboutme.publication1', // Baía Edicións
      tagKey: 'project.aboutme.tag.editorial',
      icon: <AutoStoriesOutlinedIcon fontSize="medium" />,
    },
    {
      nameKey: 'project.aboutme.publication2', // Escola Galega de Paisaxe. Fundación Juana de Vega
      tagKey: 'project.aboutme.tag.institutional',
      icon: <AccountBalanceOutlinedIcon fontSize="medium" />,
    },
    {
      nameKey: 'project.aboutme.publication6', // Calendario Municipal Concello de A Coruña
      tagKey: 'project.aboutme.tag.institutional',
      icon: <AccountBalanceOutlinedIcon fontSize="medium" />,
    },
    {
      nameKey: 'project.aboutme.publication7', // Consorcio das Mariñas
      tagKey: 'project.aboutme.tag.institutional',
      icon: <AccountBalanceOutlinedIcon fontSize="medium" />,
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: '780px', mx: 'auto', mt: 6, pb: 8 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Bebas Neue',
          textAlign: 'center',
          mb: 3.5,
          letterSpacing: '2px',
          color: '#1a1a1a',
        }}
      >
        {t('project.aboutme.publications')}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2.5,
          width: '100%',
        }}
      >
        {publicationsList.map((item, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Cover image or editorial placeholder banner */}
            <Box
              sx={{
                height: 100,
                backgroundColor: '#f4f4f4',
                backgroundImage: item.image
                  ? `url(${item.image})`
                  : 'linear-gradient(135deg, #f7f7f7 0%, #ededed 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666666',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                position: 'relative',
              }}
            >
              {!item.image && (
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#333333',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  {item.icon}
                </Box>
              )}
            </Box>

            {/* Publication Details */}
            <Box
              sx={{
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.75,
                flexGrow: 1,
              }}
            >
              <Box>
                <Typography
                  component="span"
                  sx={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    color: '#666666',
                    display: 'inline-block',
                  }}
                >
                  {t(item.tagKey)}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  lineHeight: 1.4,
                  mt: 0.5,
                }}
              >
                {t(item.nameKey)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PublicationsSection;

import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import cameraIcon from '../../../assets/images/cameraIcon.png';
import objectiveIcon from '../../../assets/images/objectiveIcon.png';
import filterIcon from '../../../assets/images/filterIcon.png';
import tripodeIcon from '../../../assets/images/tripodeIcon.png';
import flashIcon from '../../../assets/images/flashIcon.png';
import triggerIcon from '../../../assets/images/triggerIcon.png';
import { useLanguage, type MessageKey } from '../../../i18n';

interface EquipmentCategory {
  titleKey: MessageKey;
  icon: string;
  items: string[];
}

export const EquipmentSection: React.FC = () => {
  const { t } = useLanguage();

  const equipmentCategories: EquipmentCategory[] = [
    {
      titleKey: 'project.aboutme.equipment.cameras',
      icon: cameraIcon,
      items: ['Nikon D850', 'Nikon D610', 'Nikon D300'],
    },
    {
      titleKey: 'project.aboutme.equipment.lenses',
      icon: objectiveIcon,
      items: [
        'Tamron 15-30 F2.8 Di VC',
        'Tamron 24-70 2.8 VC USD',
        'Nikkor 50 f1.8',
        'Sigma 105 DG MACRO HSM',
        'Sigma 150-600 F5-6.3 DG Oss HSM',
        'Samyang 14 mm F 2.8',
      ],
    },
    {
      titleKey: 'project.aboutme.equipment.filters',
      icon: filterIcon,
      items: [
        'Haida M15 ND 0.9 SOFT graduated',
        'Haida M15 ND 1.8 6 pasos',
        'Haida Magnetic Nano coating CPL M15',
      ],
    },
    {
      titleKey: 'project.aboutme.equipment.tripods',
      icon: tripodeIcon,
      items: ['Benro Tortoise CLV'],
    },
    {
      titleKey: 'project.aboutme.equipment.flashes',
      icon: flashIcon,
      items: [
        'Flash Metz 58 AF1',
        'Flash Metz 48 AF1',
        'Flash Gloxy TR 985N',
      ],
    },
    {
      titleKey: 'project.aboutme.equipment.others',
      icon: triggerIcon,
      items: ['SMDV T803 Intervalometer', 'Flash trigger Pixel Rook'],
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: '780px', mx: 'auto', mt: 5 }}>
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
        {t('project.aboutme.equipment')}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
          width: '100%',
        }}
      >
        {equipmentCategories.map((cat, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '12px',
              padding: { xs: 2, sm: 2.5 },
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header with Icon and Title */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.75,
              }}
            >
              <Box
                component="img"
                src={cat.icon}
                alt={t(cat.titleKey)}
                sx={{
                  width: 38,
                  height: 38,
                  objectFit: 'contain',
                  flexShrink: 0,
                }}
              />

              <Typography
                sx={{
                  fontFamily: 'Bebas Neue',
                  fontSize: '1.4rem',
                  letterSpacing: '1.5px',
                  color: '#1a1a1a',
                  lineHeight: 1,
                  pt: '2px',
                }}
              >
                {t(cat.titleKey)}
              </Typography>
            </Box>

            <Divider sx={{ my: 1.5, borderColor: 'rgba(0, 0, 0, 0.06)' }} />

            {/* List of equipment items */}
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.75,
                flexGrow: 1,
              }}
            >
              {cat.items.map((item, i) => (
                <Box
                  component="li"
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.35)',
                      flexShrink: 0,
                      mt: '8px',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: 'text.primary',
                      lineHeight: 1.45,
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EquipmentSection;

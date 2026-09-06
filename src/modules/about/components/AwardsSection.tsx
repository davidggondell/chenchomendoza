import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLanguage, type MessageKey } from '../../../i18n';

interface AwardEvent {
  typeKey: MessageKey;
  textKey: MessageKey;
  isAward?: boolean;
}

interface YearGroup {
  year: string;
  items: AwardEvent[];
}

export const AwardsSection: React.FC = () => {
  const { t } = useLanguage();

  const groupedAwards: YearGroup[] = [
    {
      year: '1988',
      items: [
        {
          typeKey: 'project.aboutme.tag.award',
          textKey: 'project.aboutme.award1',
          isAward: true,
        },
      ],
    },
    {
      year: '2010',
      items: [
        {
          typeKey: 'project.aboutme.tag.expo',
          textKey: 'project.aboutme.award2',
        },
      ],
    },
    {
      year: '2012',
      items: [
        {
          typeKey: 'project.aboutme.tag.award',
          textKey: 'project.aboutme.award3',
          isAward: true,
        },
      ],
    },
    {
      year: '2015',
      items: [
        {
          typeKey: 'project.aboutme.tag.expo',
          textKey: 'project.aboutme.award4',
        },
      ],
    },
    {
      year: '2018',
      items: [
        {
          typeKey: 'project.aboutme.tag.expo',
          textKey: 'project.aboutme.award5',
        },
      ],
    },
    {
      year: '2019',
      items: [
        {
          typeKey: 'project.aboutme.tag.award',
          textKey: 'project.aboutme.award7',
          isAward: true,
        },
        {
          typeKey: 'project.aboutme.tag.expo',
          textKey: 'project.aboutme.award6',
        },
        {
          typeKey: 'project.aboutme.tag.expo',
          textKey: 'project.aboutme.award8',
        },
      ],
    },
    {
      year: '2020',
      items: [
        {
          typeKey: 'project.aboutme.tag.award',
          textKey: 'project.aboutme.award9',
          isAward: true,
        },
        {
          typeKey: 'project.aboutme.tag.project',
          textKey: 'project.aboutme.award10',
        },
      ],
    },
  ];

  const linePositionSm = '90px';
  const linePositionXs = '14px';

  return (
    <Box sx={{ width: '100%', maxWidth: '780px', mx: 'auto', mt: 6 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Bebas Neue',
          textAlign: 'center',
          mb: 4.5,
          letterSpacing: '2px',
          color: '#1a1a1a',
        }}
      >
        {t('project.aboutme.exposandawards')}
      </Typography>

      {/* Timeline container */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 3.5,
          width: '100%',
        }}
      >
        {/* Continuous vertical line running through all nodes */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: linePositionXs, sm: linePositionSm },
            top: '18px',
            bottom: '24px',
            width: '2px',
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
            transform: 'translateX(-50%)',
            zIndex: 0,
          }}
        />

        {groupedAwards.map((group, groupIdx) => {
          const hasAward = group.items.some((it) => it.isAward);

          return (
            <Box
              key={groupIdx}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'flex-start' },
                position: 'relative',
                width: '100%',
                zIndex: 1,
              }}
            >
              {/* Year Label (Left of line in desktop) */}
              <Box
                sx={{
                  width: { xs: 'auto', sm: linePositionSm },
                  height: { xs: '26px', sm: '30px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                  pr: { xs: 0, sm: 2.5 },
                  pl: { xs: '32px', sm: 0 },
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Bebas Neue',
                    fontSize: { xs: '1.35rem', sm: '1.5rem' },
                    letterSpacing: '1px',
                    color: hasAward ? '#111111' : '#555555',
                    lineHeight: 1,
                    display: 'block',
                    pt: '1px', // Fine font-metric optical baseline centering
                  }}
                >
                  {group.year}
                </Typography>
              </Box>

              {/* Timeline Bullet Node - Centered Exactly ON the Line and aligned with Year */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: linePositionXs, sm: linePositionSm },
                  top: { xs: '13px', sm: '15px' },
                  transform: 'translate(-50%, -50%)',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: hasAward ? '#111111' : '#777777',
                  border: '2.5px solid #ffffff',
                  boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.12)',
                  zIndex: 2,
                }}
              />

              {/* Grouped Cards Stack for this Year (Right of line) */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  pl: { xs: '32px', sm: 2.5 },
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {group.items.map((item, itemIdx) => (
                  <Box
                    key={itemIdx}
                    sx={{
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '10px',
                      padding: '12px 18px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.75,
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: item.isAward
                            ? 'rgba(0, 0, 0, 0.08)'
                            : 'rgba(0, 0, 0, 0.04)',
                          color: item.isAward ? '#111111' : '#666666',
                        }}
                      >
                        {t(item.typeKey)}
                      </Box>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: '0.88rem',
                        color: '#222222',
                        lineHeight: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      {t(item.textKey)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default AwardsSection;

import React from 'react';
import { Box } from '@mui/material';
import { BioSection } from '../components/BioSection';
import { EquipmentSection } from '../components/EquipmentSection';
import { AwardsSection } from '../components/AwardsSection';
import { PublicationsSection } from '../components/PublicationsSection';

export const AboutPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundImage: 'linear-gradient(to right, #F9F9F9, #ffffff)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <BioSection />
      <EquipmentSection />
      <AwardsSection />
      <PublicationsSection />
    </Box>
  );
};

export default AboutPage;

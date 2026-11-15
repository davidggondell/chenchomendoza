import React from "react";
import { Box } from "@mui/material";
import { BioSection } from "../components/BioSection";
import { EquipmentSection } from "../components/EquipmentSection";

export const AboutPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        padding: { xs: 2, sm: 3, md: 4 },
        paddingBottom: { xs: 6, md: 8 },
        backgroundImage: "linear-gradient(to right, #F9F9F9, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <BioSection />
      <EquipmentSection />
    </Box>
  );
};

export default AboutPage;

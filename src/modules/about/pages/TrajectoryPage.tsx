import React from "react";
import { Box } from "@mui/material";
import { TimelineSection } from "../components/TimelineSection";

export const TrajectoryPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundImage: "linear-gradient(to right, #F9F9F9, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <TimelineSection />
    </Box>
  );
};

export default TrajectoryPage;

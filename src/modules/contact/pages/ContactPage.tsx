import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import backgroundPhoto from "../../../assets/images/camaracolor.jpg";
import { ContactCard } from "../components/ContactCard";

export const ContactPage: React.FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundPhoto})`,
        backgroundSize: "cover",
        backgroundPosition: isSm ? "50% 50%" : "10% 50%",
        filter: "grayscale(100%)",
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, sm: 3 },
      }}
    >
      <ContactCard />
    </Box>
  );
};

export default ContactPage;

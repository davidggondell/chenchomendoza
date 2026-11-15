import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useLanguage } from "../../../i18n";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2,
          padding: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Bebas Neue",
            fontSize: { xs: "6rem", sm: "9rem" },
            lineHeight: 1,
            color: "text.primary",
            letterSpacing: "4px",
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontFamily: "Bebas Neue",
            letterSpacing: "2px",
            color: "text.primary",
          }}
        >
          {t("project.error.notFoundTitle")}
        </Typography>

        <Typography
          sx={{
            fontSize: "1rem",
            color: "text.secondary",
            maxWidth: "420px",
          }}
        >
          {t("project.error.notFoundText")}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{
            mt: 2,
            px: 3,
            py: 1,
            borderRadius: "999px",
            fontFamily: "Montserrat",
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontSize: "0.85rem",
          }}
        >
          {t("project.error.backHome")}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;

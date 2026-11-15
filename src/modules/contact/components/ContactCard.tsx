import React from "react";
import {
  Box,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import MailIcon from "@mui/icons-material/Mail";
import { LegalNotice } from "./LegalNotice";
import { SocialGrid } from "./SocialGrid";
import { useClipboard } from "../../common/hooks/useClipboard";
import { useLanguage } from "../../../i18n";

export const ContactCard: React.FC = () => {
  const email = "chenchomendoza64@gmail.com";
  const { copied, copy } = useClipboard();
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        maxWidth: "720px",
        maxHeight: "90vh",
        width: "100%",
        padding: { xs: 2.5, sm: 4 },
        backgroundColor: "rgba(255, 255, 255, 0.84)",
        backdropFilter: "blur(3px)",
        borderRadius: 2,
        overflowY: "auto",
        overflowX: "hidden",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Bebas Neue",
          textAlign: "center",
          pb: 2,
          color: "text.primary",
          letterSpacing: "2px",
        }}
      >
        {t("project.contact.contact")}
      </Typography>

      <LegalNotice />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "auto auto" },
          justifyContent: { md: "space-between" },
          gap: 3,
          pt: 2,
          borderTop: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Email Section */}
        <Box>
          <Typography
            sx={{
              fontFamily: "Bebas Neue",
              fontSize: 20,
              mb: 1,
              color: "text.primary",
            }}
          >
            {t("project.contact.personalEmail")}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "nowrap" }}>
            <Box
              component="a"
              href={`mailto:${email}`}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                color: "text.primary",
                opacity: 0.75,
                fontSize: "0.95rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
                "&:hover": {
                  opacity: 1,
                  textDecoration: "underline",
                },
              }}
            >
              <MailIcon fontSize="small" />
              {email}
            </Box>

            <Tooltip title={copied ? t("project.contact.copied") : t("project.contact.copy")}>
              <IconButton
                size="small"
                onClick={() => copy(email)}
                sx={{
                  color: copied ? "success.main" : "action.active",
                  backgroundColor: "rgba(0,0,0,0.04)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.08)" },
                  flexShrink: 0,
                }}
                aria-label={t("project.contact.copy")}
              >
                {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Social Media Section */}
        <SocialGrid />
      </Box>

      <Snackbar
        open={copied}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {t("project.contact.copied")}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactCard;

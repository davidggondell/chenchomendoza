import React from "react";
import { Box, Typography, IconButton, Icon } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import flickrIcon from "../../../assets/images/flickrIcon.png";
import pxIcon from "../../../assets/images/500pxIcon.png";
import { useLanguage } from "../../../i18n";

export const SocialGrid: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Box>
      <Typography
        sx={{
          fontFamily: "Bebas Neue",
          fontSize: 20,
          mb: 1,
          color: "text.primary",
        }}
      >
        {t("project.contact.socialMedia")}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton
          size="large"
          onClick={() =>
            window.open("https://www.instagram.com/chenchomendoza/", "_blank")
          }
          sx={{
            color: "#333333",
            transition: "all 0.4s ease",
            "&:hover": {
              color: "#000000",
              transform: "scale(1.2)",
            },
          }}
          aria-label="Instagram"
        >
          <InstagramIcon fontSize="inherit" />
        </IconButton>

        <IconButton
          size="large"
          href="https://www.flickr.com/photos/chenchomendoza/"
          target="_blank"
          sx={{
            transition: "all 0.4s ease",
            "&:hover": { transform: "scale(1.2)" },
          }}
          aria-label="Flickr"
        >
          <Icon
            fontSize="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={flickrIcon}
              style={{ height: "80%", width: "80%", opacity: 0.65 }}
              alt="Flickr"
            />
          </Icon>
        </IconButton>

        <IconButton
          size="large"
          href="https://500px.com/p/chenchomendoza"
          target="_blank"
          sx={{
            transition: "all 0.4s ease",
            "&:hover": { transform: "scale(1.2)" },
          }}
          aria-label="500px"
        >
          <Icon
            fontSize="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={pxIcon}
              style={{ height: "80%", width: "80%", opacity: 0.65 }}
              alt="500px"
            />
          </Icon>
        </IconButton>
      </Box>
    </Box>
  );
};

export default SocialGrid;

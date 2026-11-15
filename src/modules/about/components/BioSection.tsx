import React, { useState } from "react";
import { Box, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useLanguage } from "../../../i18n";
import { useBio } from "../hooks/useAboutData";
import { getLocalizedText } from "../services/aboutService";

export const BioSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: bio, isLoading } = useBio();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [loadedPortraitUrl, setLoadedPortraitUrl] = useState<string | null>(null);
  const [loadedPanoramicUrl, setLoadedPanoramicUrl] = useState<string | null>(null);

  const titleText = getLocalizedText(bio?.title, language) || t("project.aboutme.title");
  const firstParagraph =
    getLocalizedText(bio?.paragraph1, language) || t("project.aboutme.text.first");
  const secondParagraph =
    getLocalizedText(bio?.paragraph2, language) || t("project.aboutme.text.second");
  const thirdParagraph =
    getLocalizedText(bio?.paragraph3, language) || t("project.aboutme.text.third");
  const portraitSrc = bio?.portraitImage || "";
  const panoramicSrc = bio?.panoramicImage || "";

  const isPortraitLoaded = Boolean(portraitSrc && loadedPortraitUrl === portraitSrc);
  const isPanoramicLoaded = Boolean(panoramicSrc && loadedPanoramicUrl === panoramicSrc);

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", maxWidth: "720px", mx: "auto" }}>
        <Box sx={{ pt: { xs: 2, md: 4 }, pb: 2, display: "flex", justifyContent: "center" }}>
          <Skeleton variant="text" width="62%" height={46} />
        </Box>

        <Box sx={{ overflow: "hidden", mb: 4 }}>
          <Box
            sx={{
              width: isSm ? "100%" : "44%",
              float: isSm ? "none" : "left",
              pr: isSm ? 0 : 3,
              pb: isSm ? 2 : 1,
              mx: isSm ? "auto" : 0,
            }}
          >
            <Skeleton
              variant="rounded"
              width="100%"
              sx={{
                aspectRatio: "3 / 4",
                height: "auto",
                borderRadius: "2px",
              }}
            />
          </Box>

          {[1, 2, 3].map((block) => (
            <Box key={block} sx={{ mb: block < 3 ? 2.5 : 0 }}>
              <Skeleton variant="text" width="100%" height={22} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="100%" height={22} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="98%" height={22} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="94%" height={22} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width={block === 3 ? "68%" : "82%"} height={22} />
            </Box>
          ))}
        </Box>

        <Box sx={{ width: "100%", mt: 3, mb: 4 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            sx={{
              aspectRatio: "16 / 6",
              height: "auto",
              borderRadius: "2px",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className="animate-fade-in"
      sx={{ width: "100%", maxWidth: "720px", mx: "auto" }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Bebas Neue",
          pt: { xs: 2, md: 4 },
          pb: 2,
          textAlign: "center",
          letterSpacing: "2px",
        }}
      >
        {titleText}
      </Typography>

      <Box sx={{ overflow: "hidden", mb: 4 }}>
        {portraitSrc && (
          <Box
            sx={{
              position: "relative",
              width: isSm ? "100%" : "44%",
              float: isSm ? "none" : "left",
              mr: isSm ? "auto" : 3,
              ml: isSm ? "auto" : 0,
              mb: isSm ? 2 : 1,
              borderRadius: "2px",
              overflow: "hidden",
              ...(!isPortraitLoaded ? { aspectRatio: "3 / 4" } : {}),
            }}
          >
            {!isPortraitLoaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "2px",
                }}
              />
            )}
            <Box
              component="img"
              src={portraitSrc}
              alt={titleText}
              onLoad={() => setLoadedPortraitUrl(portraitSrc)}
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "2px",
                opacity: isPortraitLoaded ? 1 : 0,
                transition: "opacity 0.35s ease",
              }}
            />
          </Box>
        )}

        <Typography
          sx={{
            textAlign: "justify",
            fontSize: isSm ? 13 : 15,
            lineHeight: 1.7,
            color: "text.primary",
            mb: 2,
          }}
        >
          {firstParagraph}
        </Typography>

        <Typography
          sx={{
            textAlign: "justify",
            fontSize: isSm ? 13 : 15,
            lineHeight: 1.7,
            color: "text.primary",
            mb: 2,
          }}
        >
          {secondParagraph}
        </Typography>

        <Typography
          sx={{
            textAlign: "justify",
            fontSize: isSm ? 13 : 15,
            lineHeight: 1.7,
            color: "text.primary",
          }}
        >
          {thirdParagraph}
        </Typography>
      </Box>

      {panoramicSrc && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            mt: 3,
            mb: 4,
            borderRadius: "2px",
            overflow: "hidden",
            ...(!isPanoramicLoaded ? { aspectRatio: "16 / 6" } : {}),
          }}
        >
          {!isPanoramicLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "2px",
              }}
            />
          )}
          <Box
            component="img"
            src={panoramicSrc}
            alt="Paisaje panorámico"
            onLoad={() => setLoadedPanoramicUrl(panoramicSrc)}
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "2px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              opacity: isPanoramicLoaded ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default BioSection;

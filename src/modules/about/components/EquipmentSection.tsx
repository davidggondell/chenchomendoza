import React, { useState } from "react";
import { Box, Typography, Divider, Skeleton } from "@mui/material";
import { useLanguage } from "../../../i18n";
import { useEquipment } from "../hooks/useAboutData";
import { getLocalizedText } from "../services/aboutService";

export const EquipmentSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, isLoading } = useEquipment();
  const [loadedIcons, setLoadedIcons] = useState<Record<string, boolean>>({});

  const categories = data || [];

  return (
    <Box sx={{ width: "100%", maxWidth: "780px", mx: "auto", mt: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Bebas Neue",
          textAlign: "center",
          mb: 3.5,
          letterSpacing: "2px",
          color: "#1a1a1a",
        }}
      >
        {t("project.aboutme.equipment")}
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2.5,
            width: "100%",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Box
              key={n}
              sx={{
                backgroundColor: "#fafafa",
                border: "1px solid #ececec",
                borderRadius: "12px",
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: "8px" }} />
                <Skeleton variant="text" width="55%" height={24} />
              </Box>
              <Box sx={{ height: "1px", backgroundColor: "#efefef" }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Skeleton variant="text" width="85%" height={20} />
                <Skeleton variant="text" width="70%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          className="animate-fade-in"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2.5,
            width: "100%",
          }}
        >
          {categories.map((cat, index) => {
            const title = getLocalizedText(cat.title, language);
            const iconSrc = cat.icon || "";
            const isIconLoaded = Boolean(iconSrc && loadedIcons[iconSrc]);

            return (
              <Box
                key={cat.id || index}
                sx={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "12px",
                  padding: { xs: 2, sm: 2.5 },
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header with Icon and Title */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.75,
                  }}
                >
                  {iconSrc && (
                    <Box
                      sx={{
                        position: "relative",
                        width: 38,
                        height: 38,
                        flexShrink: 0,
                      }}
                    >
                      {!isIconLoaded && (
                        <Skeleton
                          variant="rounded"
                          width={38}
                          height={38}
                          sx={{ position: "absolute", inset: 0, borderRadius: "8px" }}
                        />
                      )}
                      <Box
                        component="img"
                        src={iconSrc}
                        alt={title}
                        onLoad={() =>
                          setLoadedIcons((prev) => ({ ...prev, [iconSrc]: true }))
                        }
                        sx={{
                          width: 38,
                          height: 38,
                          objectFit: "contain",
                          display: "block",
                          opacity: isIconLoaded ? 1 : 0,
                          transition: "opacity 0.25s ease",
                        }}
                      />
                    </Box>
                  )}

                  <Typography
                    sx={{
                      fontFamily: "Bebas Neue",
                      fontSize: "1.4rem",
                      letterSpacing: "1.5px",
                      color: "#1a1a1a",
                      lineHeight: 1,
                      pt: "2px",
                    }}
                  >
                    {title}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5, borderColor: "rgba(0, 0, 0, 0.06)" }} />

                {/* List of equipment items */}
                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    p: 0,
                    m: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.75,
                    flexGrow: 1,
                  }}
                >
                  {cat.items?.map((item, i) => (
                    <Box
                      component="li"
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          backgroundColor: "rgba(0, 0, 0, 0.35)",
                          flexShrink: 0,
                          mt: "8px",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: "text.primary",
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
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default EquipmentSection;

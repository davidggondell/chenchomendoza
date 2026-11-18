import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Skeleton,
  Dialog,
  IconButton,
  ButtonBase,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { useLanguage } from "../../../i18n";
import { ErrorAlert } from "../../common/components/ErrorAlert";
import { useTrajectoryTimeline } from "../hooks/useAboutData";
import {
  getLocalizedText,
  groupTimelineEventsByYear,
} from "../services/aboutService";
import type { TimelineCategory, TimelineEvent } from "../types";

type FilterValue = "all" | TimelineCategory;

interface CategoryStyle {
  label: string;
  accentColor: string;
  badgeBg: string;
  badgeColor: string;
  medallionBg: string;
  cardBg: string;
  icon: React.ReactNode;
  watermarkIcon: React.ReactNode;
}

export const TimelineSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: events = [], isLoading, isError, refetch } = useTrajectoryTimeline();

  const [filter, setFilter] = useState<FilterValue>("all");
  const [previewEvent, setPreviewEvent] = useState<TimelineEvent | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loadedPreviewUrls, setLoadedPreviewUrls] = useState<Record<string, boolean>>({});

  const filteredEvents = useMemo(() => {
    if (filter === "all") return events;
    return events.filter((e) => e.category === filter);
  }, [events, filter]);

  const groupedEvents = useMemo(
    () => groupTimelineEventsByYear(filteredEvents),
    [filteredEvents]
  );

  const linePositionSm = "90px";
  const linePositionXs = "14px";

  const getCategoryStyle = (event: TimelineEvent): CategoryStyle => {
    if (event.category === "award" || event.type === "award") {
      return {
        label: t("project.aboutme.tag.award"),
        accentColor: "#c68b24",
        badgeBg: "rgba(198, 139, 36, 0.13)",
        badgeColor: "#8c5e0f",
        medallionBg: "rgba(198, 139, 36, 0.1)",
        cardBg: "linear-gradient(135deg, #ffffff 0%, #fffdf8 100%)",
        icon: <EmojiEventsOutlinedIcon sx={{ fontSize: "0.9rem" }} />,
        watermarkIcon: <EmojiEventsOutlinedIcon sx={{ fontSize: "4.5rem", color: "#c68b24" }} />,
      };
    }

    if (event.category === "publication") {
      const pubTagMap: Record<string, string> = {
        press: t("project.aboutme.tag.press"),
        guide: t("project.aboutme.tag.guide"),
        editorial: t("project.aboutme.tag.editorial"),
        institutional: t("project.aboutme.tag.institutional"),
      };
      return {
        label: pubTagMap[event.type] || t("project.aboutme.tag.institutional"),
        accentColor: "#1a1a1a",
        badgeBg: "rgba(26, 26, 26, 0.09)",
        badgeColor: "#111111",
        medallionBg: "rgba(26, 26, 26, 0.07)",
        cardBg: "linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%)",
        icon: <MenuBookOutlinedIcon sx={{ fontSize: "0.9rem" }} />,
        watermarkIcon: <MenuBookOutlinedIcon sx={{ fontSize: "4.5rem", color: "#1a1a1a" }} />,
      };
    }

    return {
      label:
        event.type === "project"
          ? t("project.aboutme.tag.project")
          : t("project.aboutme.tag.expo"),
      accentColor: "#94a3b8",
      badgeBg: "rgba(148, 163, 184, 0.16)",
      badgeColor: "#475569",
      medallionBg: "rgba(148, 163, 184, 0.14)",
      cardBg: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      icon: <PhotoLibraryOutlinedIcon sx={{ fontSize: "0.9rem" }} />,
      watermarkIcon: <PhotoLibraryOutlinedIcon sx={{ fontSize: "4.5rem", color: "#94a3b8" }} />,
    };
  };

  const filters: { value: FilterValue; label: string; dotColor?: string }[] = [
    { value: "all", label: t("project.trajectory.filter.all") },
    { value: "expo", label: t("project.trajectory.filter.expos"), dotColor: "#94a3b8" },
    { value: "award", label: t("project.trajectory.filter.awards"), dotColor: "#c68b24" },
    { value: "publication", label: t("project.trajectory.filter.publications"), dotColor: "#1a1a1a" },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: "860px", mx: "auto", py: { xs: 2, md: 3 }, pb: 8 }}>
      {/* Page Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Bebas Neue",
            letterSpacing: "2.5px",
            color: "#1a1a1a",
            fontSize: { xs: "2rem", sm: "2.5rem" },
          }}
        >
          {t("project.trajectory.title")}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "#6c757d",
            mt: 1,
            maxWidth: "540px",
            mx: "auto",
            lineHeight: 1.5,
          }}
        >
          {t("project.trajectory.subtitle")}
        </Typography>

        {/* Category Filter Pills */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1,
            mt: 3,
          }}
        >
          {filters.map((f) => {
            const active = filter === f.value;
            return (
              <ButtonBase
                key={f.value}
                onClick={() => setFilter(f.value)}
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.85,
                  border: "1px solid",
                  borderColor: active ? "#1a1a1a" : "rgba(0, 0, 0, 0.12)",
                  backgroundColor: active ? "#1a1a1a" : "#ffffff",
                  color: active ? "#ffffff" : "#555555",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#1a1a1a",
                    color: active ? "#ffffff" : "#1a1a1a",
                  },
                }}
              >
                {f.dotColor && (
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: active ? "#ffffff" : f.dotColor,
                      flexShrink: 0,
                    }}
                  />
                )}
                {f.label}
              </ButtonBase>
            );
          })}
        </Box>
      </Box>

      {/* Error State */}
      {isError ? (
        <ErrorAlert
          severity="error"
          message={t("project.error.dataError")}
          onRetry={() => {
            void refetch();
          }}
        />
      ) : isLoading ? (
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: "\"\"",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: { xs: "56px", sm: "76px" },
              width: "1px",
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          {[1, 2, 3, 4].map((n) => (
            <Box
              key={n}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                mb: 4,
              }}
            >
              {/* Year Skeleton on the left */}
              <Box
                sx={{
                  width: { xs: "44px", sm: "64px" },
                  flexShrink: 0,
                  textAlign: "right",
                  pr: { xs: 1.5, sm: 2 },
                  pt: "10px",
                }}
              >
                <Skeleton variant="text" width="100%" height={24} />
              </Box>

              {/* Bullet dot */}
              <Box
                sx={{
                  position: "relative",
                  width: "24px",
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  pt: "18px",
                }}
              >
                <Box
                  sx={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    backgroundColor: "#d0d0d0",
                    border: "2px solid #ffffff",
                    boxShadow: "0 0 0 1px #d0d0d0",
                    zIndex: 1,
                  }}
                />
              </Box>

              {/* Event card skeleton */}
              <Box
                sx={{
                  flex: 1,
                  pl: { xs: 1.5, sm: 2.5 },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#fafafa",
                    border: "1px solid #ececec",
                    borderRadius: "10px",
                    p: { xs: 2, sm: 2.5 },
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Skeleton variant="rounded" width={72} height={20} sx={{ borderRadius: "4px" }} />
                    <Skeleton variant="text" width={90} height={18} />
                  </Box>
                  <Skeleton variant="text" width="65%" height={26} />
                  <Skeleton variant="text" width="90%" height={20} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        /* Unified Chronological Timeline */
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
          }}
        >
          {/* Continuous vertical spine */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: linePositionXs, sm: linePositionSm },
              top: "18px",
              bottom: "24px",
              width: "2px",
              backgroundColor: "rgba(0, 0, 0, 0.12)",
              transform: "translateX(-50%)",
              zIndex: 0,
            }}
          />

          {groupedEvents.map((group, groupIdx) => {
            const hasAward = group.items.some((it) => it.isAward);
            const yearLabel = group.year || t("project.trajectory.noYear");

            return (
              <Box
                key={group.year || `no-year-${groupIdx}`}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "flex-start" },
                  position: "relative",
                  width: "100%",
                  zIndex: 1,
                }}
              >
                {/* Year Label */}
                <Box
                  sx={{
                    width: { xs: "auto", sm: linePositionSm },
                    height: { xs: "26px", sm: "30px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "flex-start", sm: "flex-end" },
                    pr: { xs: 0, sm: 2.5 },
                    pl: { xs: "32px", sm: 0 },
                    flexShrink: 0,
                    boxSizing: "border-box",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Bebas Neue",
                      fontSize: { xs: "1.35rem", sm: "1.55rem" },
                      letterSpacing: "1px",
                      color: hasAward ? "#111111" : "#555555",
                      lineHeight: 1,
                      display: "block",
                      pt: "1px",
                    }}
                  >
                    {yearLabel}
                  </Typography>
                </Box>

                {/* Timeline Bullet Node */}
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: linePositionXs, sm: linePositionSm },
                    top: { xs: "13px", sm: "15px" },
                    transform: "translate(-50%, -50%)",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: hasAward ? "#c68b24" : "#555555",
                    border: "2.5px solid #ffffff",
                    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.12)",
                    zIndex: 2,
                  }}
                />

                {/* Event Cards for this Year */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.75,
                    pl: { xs: "32px", sm: 2.5 },
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {group.items.map((item, itemIdx) => {
                    const style = getCategoryStyle(item);
                    const itemTitle = getLocalizedText(item.title, language);
                    const hasImage = Boolean(item.image);

                    return (
                      <Box
                        key={`${item.category}-${item.id || itemIdx}`}
                        sx={{
                          position: "relative",
                          overflow: "hidden",
                          background: style.cardBg,
                          border: "1px solid rgba(0, 0, 0, 0.08)",
                          borderLeft: `4px solid ${style.accentColor}`,
                          borderRadius: "12px",
                          padding: { xs: "14px 16px", sm: "16px 20px" },
                          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          textAlign: "left",
                          gap: { xs: 2, sm: 2.5 },
                          width: "100%",
                          boxSizing: "border-box",
                          transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                          "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: "0 6px 22px rgba(0, 0, 0, 0.07)",
                            borderColor: "rgba(0, 0, 0, 0.14)",
                            borderLeftColor: style.accentColor,
                          },
                        }}
                      >
                        {/* Subtle decorative watermark icon */}
                        <Box
                          sx={{
                            position: "absolute",
                            right: -10,
                            bottom: -14,
                            opacity: 0.05,
                            pointerEvents: "none",
                            transform: "rotate(-10deg)",
                            zIndex: 0,
                          }}
                        >
                          {style.watermarkIcon}
                        </Box>

                        {/* Left Visual: Image Thumbnail OR Category Medallion */}
                        {hasImage ? (
                          <Box
                            onClick={() => setPreviewEvent(item)}
                            sx={{
                              position: "relative",
                              zIndex: 1,
                              width: { xs: "100%", sm: "176px" },
                              height: { xs: "185px", sm: "116px" },
                              borderRadius: "8px",
                              overflow: "hidden",
                              flexShrink: 0,
                              border: "1px solid rgba(0, 0, 0, 0.08)",
                              backgroundColor: "#f4f4f4",
                              cursor: "pointer",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                              "&:hover img": {
                                transform: "scale(1.06)",
                              },
                              "&:hover .zoom-overlay": {
                                opacity: 1,
                              },
                            }}
                          >
                            {item.image && !loadedImages[item.image] && (
                              <Skeleton
                                variant="rectangular"
                                width="100%"
                                height="100%"
                                animation="wave"
                                sx={{ position: "absolute", inset: 0, zIndex: 1 }}
                              />
                            )}
                            <Box
                              component="img"
                              src={item.image}
                              alt={itemTitle}
                              loading="lazy"
                              onLoad={() => {
                                if (item.image) {
                                  setLoadedImages((prev) => ({ ...prev, [item.image!]: true }));
                                }
                              }}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                opacity: item.image && loadedImages[item.image] ? 1 : 0,
                                transition: "transform 0.35s ease, opacity 0.35s ease",
                              }}
                            />
                            <Box
                              className="zoom-overlay"
                              sx={{
                                position: "absolute",
                                inset: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.28)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: 0,
                                transition: "opacity 0.25s ease",
                                color: "#ffffff",
                              }}
                            >
                              <ZoomInIcon fontSize="small" />
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              position: "relative",
                              zIndex: 1,
                              width: 44,
                              height: 44,
                              borderRadius: "10px",
                              backgroundColor: style.medallionBg,
                              color: style.accentColor,
                              display: { xs: "none", sm: "flex" },
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              mt: "2px",
                              "& svg": {
                                fontSize: "1.35rem",
                              },
                            }}
                          >
                            {style.icon}
                          </Box>
                        )}

                        {/* Text Info (Top-left aligned) */}
                        <Box
                          sx={{
                            position: "relative",
                            zIndex: 1,
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            textAlign: "left",
                            gap: 0.9,
                            minWidth: 0,
                          }}
                        >
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 0.6,
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                              padding: "3px 10px",
                              borderRadius: "4px",
                              backgroundColor: style.badgeBg,
                              color: style.badgeColor,
                            }}
                          >
                            {style.icon}
                            {style.label}
                          </Box>

                          <Typography
                            sx={{
                              fontSize: "0.93rem",
                              color: "#222222",
                              lineHeight: 1.55,
                              fontWeight: 500,
                              textAlign: "left",
                            }}
                          >
                            {itemTitle}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      {/* Lightbox Modal for Optional Event Image */}
      <Dialog
        open={Boolean(previewEvent)}
        onClose={() => setPreviewEvent(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#121212",
              color: "#ffffff",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
            },
          },
        }}
      >
        <IconButton
          onClick={() => setPreviewEvent(null)}
          aria-label={t("project.common.close")}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            color: "#ffffff",
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {previewEvent?.image && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: !loadedPreviewUrls[previewEvent.image] ? { xs: 240, sm: 360 } : undefined,
                backgroundColor: "#0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!loadedPreviewUrls[previewEvent.image] && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                  }}
                />
              )}
              <Box
                component="img"
                src={previewEvent.image}
                alt={getLocalizedText(previewEvent.title, language)}
                onLoad={() => {
                  if (previewEvent.image) {
                    setLoadedPreviewUrls((prev) => ({ ...prev, [previewEvent.image!]: true }));
                  }
                }}
                sx={{
                  maxHeight: "75vh",
                  width: "100%",
                  objectFit: "contain",
                  backgroundColor: "#0a0a0a",
                  opacity: loadedPreviewUrls[previewEvent.image] ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            </Box>
            <Box sx={{ p: 2.5, width: "100%", textAlign: "left" }}>
              {previewEvent.year && (
                <Typography
                  sx={{
                    fontFamily: "Bebas Neue",
                    fontSize: "1.15rem",
                    letterSpacing: "1.5px",
                    color: "rgba(255, 255, 255, 0.7)",
                    mb: 0.5,
                  }}
                >
                  {previewEvent.year}
                </Typography>
              )}
              <Typography sx={{ fontSize: "0.92rem", color: "#f5f5f5", lineHeight: 1.5 }}>
                {getLocalizedText(previewEvent.title, language)}
              </Typography>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default TimelineSection;

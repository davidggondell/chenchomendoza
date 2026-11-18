import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { AlertCircle, Info, RefreshCw } from "lucide-react";
import { useLanguage } from "../../../i18n";

interface ErrorAlertProps {
  severity?: "error" | "warning" | "info" | "success";
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  severity = "error",
  message,
  onRetry,
}) => {
  const { t } = useLanguage();
  const isError = severity === "error";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "42vh",
        padding: { xs: 2.5, sm: 4 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          maxWidth: "460px",
          width: "100%",
          backgroundColor: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          borderTop: `3px solid ${isError ? "#111111" : "#c68b24"}`,
          borderRadius: "10px",
          padding: { xs: "24px 20px", sm: "28px 28px" },
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 1.75,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: isError ? "rgba(17, 17, 17, 0.06)" : "rgba(198, 139, 36, 0.12)",
            color: isError ? "#111111" : "#c68b24",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isError ? <AlertCircle size={22} /> : <Info size={22} />}
        </Box>

        <Typography
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333333",
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>

        {onRetry && (
          <Button
            variant="outlined"
            startIcon={<RefreshCw size={15} />}
            onClick={onRetry}
            sx={{
              mt: 0.5,
              color: "#111111",
              borderColor: "rgba(0, 0, 0, 0.25)",
              borderRadius: "8px",
              textTransform: "uppercase",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "1.5px",
              px: 2.5,
              py: 0.85,
              "&:hover": {
                borderColor: "#111111",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {t("project.common.retry")}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ErrorAlert;

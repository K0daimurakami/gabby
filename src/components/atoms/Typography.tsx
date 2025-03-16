import React from "react";
import { Typography as MuiTypography } from "@mui/material";

interface Props {
  text: string;
  variant?: "body1" | "body2" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "inherit" | "left" | "center" | "right" | "justify";
}

const Typography: React.FC<Props> = ({
  text,
  variant = "body1",
  align = "inherit",
}) => {
  return (
    <MuiTypography variant={variant} align={align}>
      {text}
    </MuiTypography>
  );
};

export default Typography;

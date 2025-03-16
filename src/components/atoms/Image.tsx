import React from "react";
import { Box } from "@mui/material";

interface Props {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
}

const Image: React.FC<Props> = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  borderRadius = 0,
}) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width,
        height,
        borderRadius,
        objectFit: "contain",
        display: "block",
      }}
    />
  );
};

export default Image;
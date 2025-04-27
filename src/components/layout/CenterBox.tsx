import { Box } from "@mui/material";
import React from "react";

const CenterBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
    >
      {children}
    </Box>
  );
};

export default CenterBox;

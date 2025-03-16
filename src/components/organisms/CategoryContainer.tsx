import React from "react";
import { Box, Typography } from "@mui/material";
import CardItem from "../molecules/CardItem";

interface Props {
  title: string;
  items: string[];
}

const CategoryContainer: React.FC<Props> = ({ title, items }) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {items.map((item, index) => (
          <CardItem key={index} title={item} />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryContainer;

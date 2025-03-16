import React from "react";
import { Card, CardContent, Box } from "@mui/material";
import Typography from "../atoms/Typography";
import Image from "../atoms/Image";

interface Props {
  title: string;
  description: string;
  image: string;
}

const AgentCard: React.FC<Props> = ({ title, description, image }) => {
  return (
    <Card sx={{ width: 280, height: "100%" }}>
      <CardContent>
        {/* Title atom */}
        <Typography text={title} variant="h6" />
        
        {/* Image atom */}
        <Box sx={{ my: 2, position: "relative", height: 140 }}>
          <Image src={image} alt={title} height="100%" width="100%" />
        </Box>
        
        {/* Description atom */}
        <Box>
          <Typography text={description} variant="body2" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
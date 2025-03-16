import React from "react";
import { Card, CardContent, Box } from "@mui/material";
import Typography from "../atoms/Typography";
import Image from "../atoms/Image";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  image: string;
  navigateTo: string; // 遷移先ページのパス
}

// onclick関数はここに
const handleCardClick = (navigate: any, path: string) => {
  navigate(path);
};

const AgentCard: React.FC<Props> = ({ title, description, image, navigateTo }) => {
  const navigate = useNavigate();
  
  return (
    <Card
      sx={{ width: 280, height: "100%", cursor: "pointer" }}
      onClick={() => handleCardClick(navigate, navigateTo)}
    >
      <CardContent>
        {/* Title atom */}
        <Typography text={title} variant="h6" />
        
        {/* Image atom */}
        <Box sx={{ my: 2, position: "relative", height: 140 }} >
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
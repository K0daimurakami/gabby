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
      sx={{
        width: 300,
        height: 330, // 固定の高さを設定
        cursor: "pointer",
        display: "flex",
        flexDirection: "column"
      }}
      onClick={() => handleCardClick(navigate, navigateTo)}
    >
      <CardContent sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 2
      }}>
        {/* Title atom - 固定高さ */}
        <Box sx={{ height: 60, mb: 1 }}>
          <Typography text={title} variant="h6" />
        </Box>
        
        {/* Image atom - 固定高さ */}
        <Box sx={{ height: 140, mb: 2, position: "relative" }} >
          <Image src={image} alt={title} height="100%" width="100%" />
        </Box>
        
        {/* Description atom - 残りのスペースを使用 */}
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Typography text={description} variant="body2" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
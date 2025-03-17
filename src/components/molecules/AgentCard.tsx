import React from "react";
import { Card, CardContent, Box } from "@mui/material";
import Typography from "../atoms/Typography";
import Image from "../atoms/Image";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { selectMyle } from "../../pages/home/homeSlice";

interface Props {
  title: string;
  description: string;
  image: string;
  navigateTo: string; // 遷移先ページのパス
}

const AgentCard: React.FC<Props> = ({
  title,
  description,
  image,
  navigateTo,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // onclick関数はここに
  const handleCardClick = (
    navigate: any,
    path: string,
    id: string,
    title: string
  ) => {
    dispatch(
      selectMyle({
        id: id,
        title: title,
      })
    );
    navigate(path);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 330, // 固定の高さを設定
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => handleCardClick(navigate, navigateTo, title, title)}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
        }}
      >
        {/* Title atom - 固定高さ */}
        <Box sx={{ height: 60, mb: 1 }}>
          <Typography text={title} variant="h6" />
        </Box>

        {/* Image atom - 固定高さ */}
        <Box sx={{ height: 140, mb: 2, position: "relative" }}>
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

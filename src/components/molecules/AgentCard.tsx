import React from "react";
import { Card, CardContent, Box } from "@mui/material";
import Typography from "../atoms/Typography";
import Image from "../atoms/Image";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { selectMyle } from "../../pages/home/homeSlice";
import { loginSuccess } from "../../pages/home/userSlice";

interface Props {
  elementId: string; // 操作データを識別する一意な文字列
  id: number; // カテゴリ内の各カードを識別するためのID
  categoryName: string; // カテゴリの名前
  myleName: string; // Myleの名前
  description: string; // Myleの説明
  image: string; // Myleのイメージ画像
  navigateTo: string; // 遷移先ページのパス
  mailAddress: string;
}

const AgentCard: React.FC<Props> = ({
  elementId,
  id,
  categoryName,
  myleName,
  description,
  image,
  navigateTo,
  mailAddress,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // onclick関数はここに
  const handleCardClick = (
    elementId: any,
    navigate: any,
    path: string,
    id: any,
    categoryName: string,
    myleName: string
  ) => {
    dispatch(
      selectMyle({
        elementId: elementId,
        id: id,
        categoryName: categoryName,
        myleName: myleName,
        description: description,
      })
    );
    dispatch(loginSuccess(mailAddress));
    navigate(`${path}?elementId=${elementId}`);
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
      onClick={() => handleCardClick(elementId, navigate, navigateTo, id, categoryName, myleName)}
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
          <Typography text={myleName} variant="h6" />
        </Box>

        {/* Image atom - 固定高さ */}
        <Box sx={{ height: 140, mb: 2, position: "relative" }}>
          <Image src={image} alt={categoryName} height="100%" width="100%" />
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

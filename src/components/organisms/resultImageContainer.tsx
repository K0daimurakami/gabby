import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Card, CardMedia, Typography } from "@mui/material";

const styles = {
  typography: {
    backgroundColor: "#E3823D",
    color: "white",
  },
};

const ResultImageContainer: React.FC = () => {
  const outputUrl = useSelector((state: RootState) => state.details.outputUrl);

  if (!outputUrl) return null; // ✅ 画像が設定されていない場合は何も表示しない

  return (
    <>
      <Typography
        variant="h5"
        sx={{ backgroundColor: "#E3823D", color: "white" }}
      >
        ◆ 結果
      </Typography>
      <Card>
        <CardMedia component="img" image={outputUrl} alt="出力結果画像" />
      </Card>
    </>
  );
};

export default ResultImageContainer;

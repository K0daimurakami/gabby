import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from "@mui/material";

interface ImageCardProps {
  imageUrl: string;
  altText?: string;
}

const ResultImageContainer: React.FC<ImageCardProps> = ({ imageUrl, altText = "デフォルトの代替テキスト" }) => {
  return (
    <>
    <Typography variant="h5" sx={{ backgroundColor: '#E3823D', color: 'white' }}>
      ◆ 結果
      </Typography>
      <Card>
        <CardMedia component="img" image={imageUrl} alt="出力結果画像" />
      </Card>
    </>
  );
};

export default ResultImageContainer;

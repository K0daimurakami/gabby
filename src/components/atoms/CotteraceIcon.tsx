import React from 'react';
import { IconButton, Box } from '@mui/material';

type CoterraceIconProps = {
  onClick?: () => void;
};

const CoterraceIcon: React.FC<CoterraceIconProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        // 横長のボタンにするための幅と高さの指定
        width: 200, // 必要に応じて調整
        height: 50, // 必要に応じて調整
        padding: 0,
        // ボタン内のアイテムを中央に配置
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="img"
        src="/images/coterraceLogo.png"
        alt="Coterrace"
        sx={{
          width: '100%',   // 親要素（IconButton）の幅に合わせる
          height: 'auto',  // 縦横比を維持
        }}
      />
    </IconButton>
  );
};

export default CoterraceIcon;

import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const LoginTop: React.FC = () => {
  return (
    <>
    <Typography variant="h6" gutterBottom>
        ログインしてください
      </Typography>
      <Box>
        <Button
          onClick={() => (window.location.href = "/signin")}
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          サインイン
        </Button>
        <Button
          onClick={() => (window.location.href = "/signup")}
          variant="outlined"
        >
          サインアップ
        </Button>
      </Box>
    </>
  );
};

export default LoginTop;

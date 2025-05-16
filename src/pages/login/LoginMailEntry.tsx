import React, { useState } from "react";
import {
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserField,
} from "./userSlice";
import store, { RootState } from "../../redux/store";
import {
  Box,
  Button,
  Typography,
  TextField,
  Link,
} from "@mui/material";

/**
 * ログインメアド入力画面コンポーネント
 */
const LoginMailEntry: React.FC = () => {
  // ユーザ情報(スライスから取得)
  const sliceUserInf = useSelector((state: RootState) => state.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (!sliceUserInf.email) return;
    navigate(`/signin-password`, { state: sliceUserInf.email });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Box
        bgcolor="background.paper"
        p={4}
        borderRadius={2}
        boxShadow={2}
        width="100%"
        maxWidth={400}
        textAlign="center"
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          サインイン
        </Typography>
        <TextField
          fullWidth
          label="メールアドレス"
          value={sliceUserInf.email}
          onChange={(e) => dispatch(setUserField({ key: "email", value: e.target.value}))}
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleNext}
        >
          次へ
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          新規アカウント作成は、
          <Link href="/signup" underline="hover">
            こちらへ
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginMailEntry;
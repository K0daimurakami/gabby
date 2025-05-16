import React, { useState } from "react";
import {
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../redux/store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  setUserField,
} from "./userSlice";
import {
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

/**
 * ログインPW入力画面コンポーネント
 */
const LoginPwEntry: React.FC = () => {
  /* ユーザプール設定（cognito） */
  const poolData = {
    UserPoolId: "ap-northeast-1_f2DWq8JMM",
    ClientId: "52raclcpqs9d6skfn49293uv8f",
  };
  const userPool = new CognitoUserPool(poolData);

  /* 画面利用するstate */
  // ユーザ情報(スライスから取得)
  const sliceUserInf = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * ログインをする処理
  */
  const handleLogin = async () => {
    dispatch(loginStart()); // ローディング開始

    // 認証ユーザ情報(cognito)
    const authenticationDetails = new AuthenticationDetails({
      Username: sliceUserInf.email,
      Password: sliceUserInf.password,
    });
    const userData = {
      Username: sliceUserInf.email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    // 認証処理
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        dispatch(loginSuccess(sliceUserInf.email));
        navigate("/home");
      },
      onFailure: (err) => {
        dispatch(loginFailure(err.message || "ログインに失敗しました"));
      },
    });
  };

  return (
    <Box>
      <TextField
        label="メールアドレス"
        fullWidth
        value={sliceUserInf.email}
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        label="パスワード"
        type="password"
        fullWidth
        value={sliceUserInf.password}
        onChange={(e) =>
          dispatch(setUserField({ key: "password", value: e.target.value }))
        }
        sx={{ mb: 2 }}
      />
      {sliceUserInf.authError && (
        <Typography color="error" sx={{ mt: 2 }}>
          メールアドレス、もしくはパスワードが誤っています。
        </Typography>
      )}
      <Button onClick={handleLogin} variant="contained">
        サインイン
      </Button>
    </Box>
  );
};

export default LoginPwEntry;

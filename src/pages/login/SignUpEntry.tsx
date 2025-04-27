import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../redux/store";
import GlobalMenu from "../../components/layout/GlobalMenu";
import Home from "../../pages/home/Home";
import {
  setUserProfile,
  clearUserProfile,
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} from "../../pages/home/userSlice";
import LoginMailEntry from "../../pages/login/LoginMailEntry";
import LoginPwEntry from "../../pages/login/LoginPwEntry";
import {
  Container,
  CssBaseline,
  Box,
  Button,
  Typography,
  TextField,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";

// サインアップ画面コンポーネント
const SignUpEntry: React.FC = () => {
  // Cognito設定
  const poolData = {
    UserPoolId: "ap-northeast-1_f2DWq8JMM",
    ClientId: "52raclcpqs9d6skfn49293uv8f",
  };
  const userPool = new CognitoUserPool(poolData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [message, setMessage] = useState("");
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // サインアップ（アカウント作成）処理
  const handleSignUp = () => {
    setMessage("");

    userPool.signUp(email, password, [], [], (err, result) => {
      if (err || !result) {
        dispatch(signupFailure(err?.message || "サインアップに失敗しました"));
        setMessage(`エラー: ${err?.message}`);
        return;
      }
      dispatch(signupSuccess());
      setCognitoUser(result.user);
      setShowCodeInput(true);
      setMessage("確認コードをメールに送信しました。入力してください。");
    });
  };

  // 確認コード入力後の処理（登録確定＆ログイン）
  const handleConfirmCode = () => {
    if (!cognitoUser) return;

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        setMessage(`確認失敗: ${err.message}`);
        return;
      }

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (session) => {
          dispatch(loginSuccess(email));
          navigate("/home");
        },
        onFailure: (loginErr) => {
          dispatch(loginFailure(loginErr.message || "ログインに失敗しました"));
          setMessage(`ログインエラー: ${loginErr.message}`);
        },
      });
    });
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">アカウントを作成</Typography>

      {!showCodeInput ? (
        <>
          <TextField
            type="email"
            placeholder="メール"
            label="メールアドレス"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            type="password"
            placeholder="パスワード"
            label="パスワード"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleSignUp}>
            サインアップ
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="確認コード"
            fullWidth
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleConfirmCode}>
            確認してログイン
          </Button>
        </>
      )}

      {message && (
        <Typography color="error" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default SignUpEntry;

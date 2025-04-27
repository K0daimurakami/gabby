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

// ログインPW画面コンポーネント
const LoginPwEntry: React.FC = () => {
  // Cognito設定
  const poolData = {
    UserPoolId: "ap-northeast-1_f2DWq8JMM",
    ClientId: "52raclcpqs9d6skfn49293uv8f",
  };
  const userPool = new CognitoUserPool(poolData);

  // ユーザー入力状態管理
  const location = useLocation();
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.user.error);
  const passedEmail = location.state?.email || "";
  const [email, setEmail] = useState(passedEmail);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ログイン処理
  const handleLogin = async () => {
    console.log("ログイン処理を開始");
    dispatch(loginStart()); // ローディング開始
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData = {
      Username: email,
      Pool: userPool, // これはすでに App.tsx 内で定義されてますね
    };
    const cognitoUser = new CognitoUser(userData);
    console.log("CognitoUser:", cognitoUser);

    // 認証開始
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log(
          "ログイン成功！アクセストークン:",
          result.getAccessToken().getJwtToken()
        );
        dispatch(loginSuccess(email)); // email はすでに state にあるユーザーのもの
        navigate("/home");
      },
      onFailure: (err) => {
        console.error("ログイン失敗:", err);
        dispatch(loginFailure(err.message || "ログインに失敗しました"));
      },
    });
  };

  return (
    <Box>
      <TextField
        label="メールアドレス"
        fullWidth
        value={email}
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        label="パスワード"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && (
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

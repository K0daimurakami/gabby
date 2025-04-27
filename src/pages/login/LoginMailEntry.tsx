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
import { useAuth } from "react-oidc-context";
import GlobalMenu from "../../components/layout/GlobalMenu";
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

// ログインメアド画面コンポーネント
const LoginMailEntry: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!email) return;
    navigate(`/signin-password`, { state: { email } });
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useAuth } from "react-oidc-context";
import GlobalMenu from "./components/layout/GlobalMenu";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import { Container, CssBaseline, Box, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// デフォルトカラーの設定
const theme = createTheme({
  palette: {
    primary: {
      main: "#F1CF24",
    },
    secondary: {
      main: "#FFFAE7",
    },
    // 背景色の設定
    background: {
      default: "#FFFAE7", // 全体の背景色
      paper: "#FFFFFF",   // Paperコンポーネントの背景色
    },
    // テキストカラーの設定（例としてタイトル用と本文用）
    text: {
      primary: "#000000", // タイトル用
      secondary: "#333333", // 本文用（必要に応じて調整してください）
    }
  },
  typography: {
    fontFamily: "NotoSansReguler, sans-serif",
  },
});

// サインアウトリダイレクト関数
const signOutRedirect = () => {
  const clientId = "52raclcpqs9d6skfn49293uv8f";
  const logoutUri = "http://localhost:3000/";
  const cognitoDomain = "https://ap-northeast-1f2dwq8jmm.auth.ap-northeast-1.amazoncognito.com";
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};

// TODO: atomic designに従ってコンポーネントを分割する

const App: React.FC = () => {
  // 認証状態を取得
  const auth = useAuth();

  // ローディング中
  if (auth.isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Typography>Loading...</Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  // エラー発生時
  if (auth.error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Typography>エラーが発生しました: {auth.error.message}</Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  // 認証済みの場合
  if (auth.isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Router>
            <GlobalMenu />
            <Container>
              
              {/* 認証情報の表示 実験用*/}
              <Box my={2} p={2} bgcolor="background.paper">
                <Typography>ユーザー: {auth.user?.profile.email}</Typography>
                <Button
                  onClick={() => auth.removeUser()}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  サインアウト
                </Button>
              </Box>
              
              {/* 既存のルーティング */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details" element={<Details />} />
              </Routes>
            </Container>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }

  // 未認証の場合
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" minHeight="100vh">
          <Typography variant="h6" gutterBottom>ログインしてください</Typography>
          <Box>
            <Button
              onClick={() => auth.signinRedirect()}
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              サインイン
            </Button>
            <Button
              onClick={() => signOutRedirect()}
              variant="outlined"
            >
              サインアウト
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;

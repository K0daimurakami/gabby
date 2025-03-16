import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import GlobalMenu from "./components/layout/GlobalMenu";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import { Container, CssBaseline } from "@mui/material";
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
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaselineを追加して、ブラウザのデフォルトスタイルをリセット */}
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <GlobalMenu />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details" element={<Details />} />
            </Routes>
          </Container>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;

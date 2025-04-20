import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { useAuth } from "react-oidc-context";
import GlobalMenu from "./components/layout/GlobalMenu";
import Home from "./pages/home/Home";
import { setUserProfile, clearUserProfile } from "./pages/home/userSlice";
import Details from "./pages/details/Details";
import { Container, CssBaseline, Box, Button, Typography, TextField, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Onb001Details from "./pages/details/Onb001Details";
import Onb002Details from "./pages/details/Onb002Details";
import Onb003Details from "./pages/details/Onb003Details";
import Onb004Details from "./pages/details/Onb004Details";
import Onb005Details from "./pages/details/Onb005Details";
import Dive006Details from "./pages/details/Dive006Details";
import Dive007Details from "./pages/details/Dive007Details";
import Dive008Details from "./pages/details/Dive008Details";
import Dive009Details from "./pages/details/Dive009Details";
import Dive010Details from "./pages/details/Dive010Details";
import Dive011Details from "./pages/details/Dive011Details";
import Lead012Details from "./pages/details/Lead012Details";
import Lead013Details from "./pages/details/Lead013Details";
import Lead014Details from "./pages/details/Lead014Details";
import Lead015Details from "./pages/details/Lead015Details";
import Lead016Details from "./pages/details/Lead016Details";
import Cult017Details from "./pages/details/Cult017Details";
import Cult018Details from "./pages/details/Cult018Details";
import Cult019Details from "./pages/details/Cult019Details";
import Cult020Details from "./pages/details/Cult020Details";
import Cult021Details from "./pages/details/Cult021Details";
import Skil022Details from "./pages/details/Skil022Details";
import Skil023Details from "./pages/details/Skil023Details";
import Skil024Details from "./pages/details/Skil024Details";
import Recr025Details from "./pages/details/Recr025Details";
import Welb026Details from "./pages/details/Welb026Details";
import Welb027Details from "./pages/details/Welb027Details";
import Welb028Details from "./pages/details/Welb028Details";
import Rewd029Details from "./pages/details/Rewd029Details";
import Rewd030Details from "./pages/details/Rewd030Details";
import Succ031Details from "./pages/details/Succ031Details";
import Succ032Details from "./pages/details/Succ032Details";
import Succ033Details from "./pages/details/Succ033Details";
import Comp034Details from "./pages/details/Comp034Details";
import Comp035Details from "./pages/details/Comp035Details";
import Comp036Details from "./pages/details/Comp036Details";

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
      paper: "#FFFFFF", // Paperコンポーネントの背景色
    },
    // テキストカラーの設定（例としてタイトル用と本文用）
    text: {
      primary: "#000000", // タイトル用
      secondary: "#333333", // 本文用（必要に応じて調整してください）
    },
  },
  typography: {
    fontFamily: "NotoSansReguler, sans-serif",
  },
});

// サインアウトリダイレクト関数
const signOutRedirect = () => {
  const clientId = "52raclcpqs9d6skfn49293uv8f";
  const logoutUri = "http://localhost:3000/";
  const cognitoDomain =
    "https://ap-northeast-1f2dwq8jmm.auth.ap-northeast-1.amazoncognito.com";
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri
  )}`;
};

// TODO: atomic designに従ってコンポーネントを分割する

// クエリパラメータ：IDに対するコンポーネントマッピング
const componentMap: Record<string, React.FC> = {
  Onboarding_KnowledgeSupport_001: Onb001Details,
  Onboarding_SkillGapAssessment_002: Onb002Details,
  Onboarding_NetworkBuilding_003: Onb003Details,
  Onboarding_ProgressManagement_004: Onb004Details,
  Onboarding_CultureIntegration_005: Onb005Details,
  Diversity_GenderEquality_006: Dive006Details,
  Diversity_CulturalInclusion_007: Dive007Details,
  Diversity_DisabilitySupport_008: Dive008Details,
  Diversity_LGBTQInclusion_009: Dive009Details,
  Diversity_AgeInclusion_010: Dive010Details,
  Diversity_RegionalDiversity_011: Dive011Details,
  Leadership_Identification_012: Lead012Details,
  Leadership_TrainingDesign_013: Lead013Details,
  Leadership_PracticalSupport_014: Lead014Details,
  Leadership_ProgressMonitoring_015: Lead015Details,
  Leadership_CrossOrganizationalExchange_016: Lead016Details,
  Culture_EngagementScore_017: Cult017Details,
  Culture_FeedbackAnalysis_018: Cult018Details,
  Culture_WorkshopSupport_019: Cult019Details,
  Culture_DI_Promotion_020: Cult020Details,
  Culture_CultureChangeMonitoring_021: Cult021Details,
  Skill_Reskilling_022: Skil022Details,
  Skill_CareerDevelopment_023: Skil023Details,
  Skill_PerformanceManagement_024: Skil024Details,
  Recruitment_ReferralSupport_025: Recr025Details,
  Wellbeing_HealthSupport_026: Welb026Details,
  Wellbeing_CafeteriaPlan_027: Welb027Details,
  Wellbeing_HybridWork_028: Welb028Details,
  Reward_NonMonetary_029: Rewd029Details,
  Reward_PerformanceBased_030: Rewd030Details,
  Succession_LeaderIdentification_031: Succ031Details,
  Succession_DevelopmentProgram_032: Succ032Details,
  Succession_ProgressMonitoring_033: Succ033Details,
  Compliance_LaborLaw_034: Comp034Details,
  Compliance_DataProtection_035: Comp035Details,
  Compliance_InternationalRegulation_036: Comp036Details,
};

/**
 * クエリパラメータから遷移先コンポーネントを判定するコンポーネント
 */
const DynamicDetailComponent: React.FC = () => {
  // 現在のURL取得
  const location = useLocation();
  // クエリパラメータの解析
  const searchParams = new URLSearchParams(location.search);
  const detailId = searchParams.get("elementId");
  // IDに対応するコンポーネントを取得
  const SelectedComponent =
    detailId && componentMap[detailId]
      ? componentMap[detailId]
      : () => <p>該当する詳細が見つかりません。</p>;
  return <SelectedComponent />;
};

// サインインメアドコンポーネント
const UnauthEntry: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!email) return;
    navigate(`/signin-password`);
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
        <Typography variant="body1" color="text.secondary" gutterBottom>
          作成済アカウントにサインインができます。
        </Typography>

        <TextField
          fullWidth
          label="メールアドレス"
          placeholder="name@host.com"
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

// サインアップコンポーネント
const UnauthSignUp: React.FC = () => {
  // 各フォーム入力の状態管理
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [birthdate, setBirthdate] = React.useState(""); // カスタム属性の例
  const [message, setMessage] = React.useState("");

  // JSX部分（UI）
  return (
    <Box mt={4}>
      <Typography variant="h6">アカウントを作成</Typography>
      <input
        type="email"
        placeholder="メール"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="date"
        placeholder="誕生日"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <br />
      <Button variant="contained">サインアップ</Button>
      {message && <Typography mt={2}>{message}</Typography>}
    </Box>
  );
};

// サインインパスワードコンポーネント
const UnauthenticatedSignInForm: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  return (
    <Box mt={4}>
      <Typography variant="h6">ログイン</Typography>
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button variant="contained">サインイン</Button>
      {message && <Typography mt={2}>{message}</Typography>}
    </Box>
  );
};

/**
 * アプリケーションのメインコンポーネント
 */
const App: React.FC = () => {
  // 認証状態を取得
  const auth = useAuth();
  const dispatch = useDispatch();

  // 認証済みならユーザ情報をReduxに保存
  React.useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      dispatch(setUserProfile(auth.user.profile)); // 👈 ここで保存
    } else {
      dispatch(clearUserProfile());
    }
  }, [auth.isAuthenticated, auth.user, dispatch]);

  // ローディング中
  if (auth.isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
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
                <Route path="/details" element={<DynamicDetailComponent />} />
              </Routes>
            </Container>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }

  // 未認証の場合の画面描画（サインイン・サインアップ・案内画面を表示）
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Container>
            <Routes>
              {/* サインインメアド画面 */}
              <Route
                path="/signin"
                element={
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    minHeight="100vh"
                  >
                    {/* サインインメアド画面 */}
                    <UnauthEntry />
                  </Box>
                }
              />

              {/* サインインPW画面 */}
              <Route
                path="/signin-password"
                element={
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    minHeight="100vh"
                  >
                    {/* サインインメアド画面 */}
                    <UnauthenticatedSignInForm />
                  </Box>
                }
              />

              {/* サインアップ画面（カスタムUI） */}
              <Route
                path="/signup"
                element={
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    minHeight="100vh"
                  >
                    {/* サインアップ画面呼び出し */}
                    <UnauthSignUp />
                  </Box>
                }
              />

              {/* ログインTOP画面 */}
              <Route
                path="*"
                element={
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    minHeight="100vh"
                  >
                    {/* ユーザーへの案内文 */}
                    <Typography variant="h6" gutterBottom>
                      ログインしてください
                    </Typography>

                    {/* サインイン・サインアップ画面への遷移ボタン */}
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
                  </Box>
                }
              />
            </Routes>
          </Container>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};
export default App;

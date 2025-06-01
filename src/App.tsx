import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "./redux/store";
import CenterBox from "./components/layout/CenterBox";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";
import Home from "./pages/home/Home";
import LoginMailEntry from "./pages/login/LoginMailEntry";
import LoginPwEntry from "./pages/login/LoginPwEntry";
import SignUpEntry from "./pages/login/SignUpEntry";
import {Container, CssBaseline, Typography} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CognitoUserPool,
} from "amazon-cognito-identity-js";
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
import Dive0115Details from "./pages/details/Dive0115Details";
import Lead012Details from "./pages/details/Lead012Details";
import Lead013Details from "./pages/details/Lead013Details";
import Lead014Details from "./pages/details/Lead014Details";
import Lead015Details from "./pages/details/Lead015Details";
import Lead016Details from "./pages/details/Lead016Details";
import Cult0165Details from "./pages/details/Cult0165Details";
import Cult017Details from "./pages/details/Cult017Details";
import Cult018Details from "./pages/details/Cult018Details";
import Cult019Details from "./pages/details/Cult019Details";
import Cult0215Details from "./pages/details/Cult0215Details";
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
  Diversity_DEI_WordDetactive_0115: Dive0115Details,
  Leadership_Identification_012: Lead012Details,
  Leadership_TrainingDesign_013: Lead013Details,
  Leadership_PracticalSupport_014: Lead014Details,
  Leadership_ProgressMonitoring_015: Lead015Details,
  Leadership_CrossOrganizationalExchange_016: Lead016Details,
  Culture_MVVPromotionEvent_0165: Cult0165Details,
  Culture_EngagementScore_017: Cult017Details,
  Culture_FeedbackAnalysis_018: Cult018Details,
  Culture_WorkshopSupport_019: Cult019Details,
  Culture_DI_Promotion_020: Cult020Details,
  Culture_CultureChangeMonitoring_021: Cult021Details,
  Culture_HRBP_0215: Cult0215Details,
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

// Cognito設定
const poolData = {
  UserPoolId: "ap-northeast-1_f2DWq8JMM",
  ClientId: "52raclcpqs9d6skfn49293uv8f",
};
const userPool = new CognitoUserPool(poolData);

// TODO Route Protectをする

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
      : () => <p>該当するMyleが見つかりません。</p>;
  return <SelectedComponent />;
};

/**
 * アプリケーションのメインコンポーネント
 */
const App: React.FC = () => {
  const { isAuthenticated, isProcessing: isLoading, email, authError: error } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        {/* ローディング中 */}
        {isLoading && (
          <Container>
            <CenterBox>
              <Typography>Loading...</Typography>
            </CenterBox>
          </Container>
        )}
        {/* 認証済み */}
        {isAuthenticated && !isLoading && !error && (
          <>
            <AuthenticatedLayout>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/details" element={<DynamicDetailComponent />} />
              </Routes>
            </AuthenticatedLayout>
          </>
        )}
        {/* 未認証 */}
        {!isAuthenticated && !isLoading && (
          <Container>
            <Routes>
              <Route
                path="/signin"
                element={
                  <CenterBox>
                    <LoginMailEntry />
                  </CenterBox>
                }
              />
              <Route
                path="/signin-password"
                element={
                  <CenterBox>
                    <LoginPwEntry />
                  </CenterBox>
                }
              />
              <Route
                path="/signup"
                element={
                  <CenterBox>
                    <SignUpEntry />
                  </CenterBox>
                }
              />
              <Route
                path="*"
                element={
                  <CenterBox>
                    <LoginMailEntry></LoginMailEntry>
                  </CenterBox>
                }
              />
            </Routes>
          </Container>
        )}
      </Provider>
    </ThemeProvider>
  );
};

export default App;

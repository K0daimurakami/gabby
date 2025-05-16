import React, { useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserField,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
} from "./userSlice";
import AgentCard from "../../components/molecules/AgentCard";
import { Box, Button, Typography, TextField, Card } from "@mui/material";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { RootState } from "../../redux/store";

/**
 * サインアップ画面コンポーネント
 */
const SignUpEntry: React.FC = () => {
  /* ユーザプール設定（cognito） */
  const poolData = {
    UserPoolId: "ap-northeast-1_f2DWq8JMM",
    ClientId: "52raclcpqs9d6skfn49293uv8f",
  };
  const userPool = new CognitoUserPool(poolData);

  /* 画面利用するstate */
  // cognito情報
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null); //認証処理で利用するユーザ情報
  // ユーザ情報(スライスから取得)
  const sliceUserInf = useSelector((state: RootState) => state.user);
  // この画面のみで持つ情報
  const [confirmationCode, setConfirmationCode] = useState(""); //メール送信される確認コード
  const [isConfirmed, setIsConfirmed] = useState(false); //画面項目が入力済か判定するフラグ
  const [showCodeInput, setShowCodeInput] = useState(false); //画面項目が入力済か判定するフラグ（PWまで）
  const [message, setMessage] = useState(""); //画面メッセージ（PW入力時、確認コード入力時）
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** 
   * ユーザが選択したカテゴリからAgentCard生成
  */
  // エージェントを生成
  const categoryAgents = useSelector((state: RootState) => {
    return state.home.categories[sliceUserInf.interestedCategory] || [];
  });
  // カードを生成
  const renderRecommendedAgents = () => {
    if (!categoryAgents || categoryAgents.length === 0) {
      return <Typography>おすすめのエージェントは見つかりませんでした。</Typography>;
    }
    return categoryAgents.map((agent, index) => (
      <AgentCard
        key={agent.elementId}
        elementId={agent.elementId}
        id={index}
        categoryName={sliceUserInf.interestedCategory}
        myleName={agent.title}
        description={agent.description}
        image={agent.image}
        navigateTo={`/${agent.detailPage}`}
        mailAddress={sliceUserInf.email}
      />
    ));
  };

  /**
   * メアド・PWをcognitoに送信する処理
   */
  const handleSignUp = () => {
    setMessage("");

    userPool.signUp(sliceUserInf.email, sliceUserInf.password, [], [], (err, result) => {
      if (err || !result) {
        dispatch(signupFailure(err?.message || "サインアップに失敗しました"));
        setMessage(`エラー: ${err?.message}`);
        return;
      }
      // 成功した場合
      dispatch(signupSuccess());
      setCognitoUser(result.user);
      setShowCodeInput(true); //確認コード入力欄を表示
      setMessage("確認コードをメールに送信しました。入力してください。");
    });
  };

  /**
   * 確認コードで登録確定＆ログインをする処理
   */
  const handleConfirmCode = () => {
    if (!cognitoUser) return;

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        setMessage(`確認失敗: ${err.message}`);
        return;
      }
      // 認証ユーザ情報(cognito)
      const authDetails = new AuthenticationDetails({
        Username: sliceUserInf.email,
        Password: sliceUserInf.password,
      });
      const user = new CognitoUser({
        Username: sliceUserInf.email,
        Pool: userPool,
      });
      // ログイン処理
      user.authenticateUser(authDetails, {
        onSuccess: (session) => {
          setIsConfirmed(true); //認証済フラグを立てる
          setMessage("");
        },
        onFailure: (loginErr) => {
          dispatch(loginFailure(loginErr.message || "ログインに失敗しました"));
          setMessage(`ログインエラー: ${loginErr.message}`);
        },
      });
    });
  };

  return (
    <Box mt={4} display="flex" flexDirection="column" sx={{ width: "100%" }}>
      <Typography variant="h6" mb={2}>
        アカウントを作成
      </Typography>
        <TextField
          type="email"
          placeholder="メール"
          label="メールアドレス"
          fullWidth
          value={sliceUserInf.email}
          onChange={(e) => dispatch(setUserField({ key: "email", value: e.target.value}))}
          sx={{ mb: 2, width: "50%" }}
        />

        <TextField
          select
          label="関心のあるHRカテゴリ"
          value={sliceUserInf.interestedCategory}
          onChange={(e) => dispatch(setUserField( {key: "interestedCategory", value: e.target.value}))}
          fullWidth
          SelectProps={{
            native: true,
          }}
          sx={{ mb: 2, width: "50%" }}
        >
          <option value=""></option>
          <option value="オンボーディング支援">オンボーディング支援</option>
          <option value="ダイバーシティ推進">ダイバーシティ推進</option>
          <option value="リーダーシップ育成">リーダーシップ育成</option>
          <option value="組織風土改善">組織風土改善</option>
          <option value="スキル・能力開発（全般）">
            スキル・能力開発（全般）
          </option>
          <option value="採用関連">採用関連</option>
          <option value="福利厚生（Well-being支援）">
            福利厚生（Well-being支援）
          </option>
          <option value="リワード（報酬・インセンティブ）">
            リワード（報酬・インセンティブ）
          </option>
          <option value="サクセッションプランニング">
            サクセッションプランニング
          </option>
          <option value="HRコンプライアンス">HRコンプライアンス</option>
        </TextField>

        <TextField
          label="特に課題に思っていること"
          placeholder="自由にご記入ください"
          multiline
          rows={1}
          fullWidth
          value={sliceUserInf.personalIssue}
          onChange={(e) => dispatch(setUserField({ key: "personalIssue", value: e.target.value}))}
          sx={{ mb: 2, width: "70%" }}
        />

        <Box display="flex" gap={2} sx={{ mb: 7, width: "60%" }}>
          <TextField
            type="password"
            placeholder="8文字以上・英大文字/小文字・数字・記号を含めてください"
            label="パスワード"
            value={sliceUserInf.password}
            onChange={(e) => dispatch(setUserField({key: "password", value: e.target.value}))}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleSignUp}
            sx={{ width: "200px" }}
          >
            確認メール送信
          </Button>
        </Box>

        {showCodeInput && (
          <Box display="flex" gap={2} sx={{ mb: 2, width: "55%" }}>
            <TextField
              label="確認コード"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleConfirmCode}
              sx={{ width: "200px" }}
            >
              確認コード送信
            </Button>
          </Box>
        )}

        {message && (
          <Typography color="error" mt={2}>
            {message}
          </Typography>
        )}

        {isConfirmed && (
          <Box mt={4}>
            <Box display="flex" justifyContent="center" mb={2}>
              <Typography variant="h6">あなたにオススメのMyle</Typography>
            </Box>
            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
              {renderRecommendedAgents()}
            </Box>
            <Box display="flex" justifyContent="center" mt={4} mb={8}>
              <Card
                sx={{
                  width: "80%",
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  bgcolor: "white",
                  color: "primary.dark",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
                onClick={() => {
                  dispatch(loginSuccess(sliceUserInf.email));
                  navigate("/home");
                }}
              >
                <Typography variant="h5">Myle一覧へ</Typography>
              </Card>
            </Box>
          </Box>
        )}
    </Box>
  );
};

export default SignUpEntry;

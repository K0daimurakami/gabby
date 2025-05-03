import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
} from "../../pages/home/userSlice";
import AgentCard from "../../components/molecules/AgentCard";
import { Box, Button, Typography, TextField, Card } from "@mui/material";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { RootState } from "../../redux/store";

// サインアップ画面コンポーネント
const SignUpEntry: React.FC = () => {
  // Cognito設定
  const poolData = {
    UserPoolId: "ap-northeast-1_f2DWq8JMM",
    ClientId: "52raclcpqs9d6skfn49293uv8f",
  };
  const userPool = new CognitoUserPool(poolData);
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [issue, setIssue] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [message, setMessage] = useState("");
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryAgents = useSelector((state: RootState) => {
    return state.home.categories[selectedCategory] || [];
  });
  
  // AgentCard生成
  const renderRecommendedAgents = () => {
    if (!categoryAgents || categoryAgents.length === 0) {
      return <Typography>おすすめのエージェントは見つかりませんでした。</Typography>;
    }

    return categoryAgents.map((agent, index) => (
      <AgentCard
        key={agent.elementId}
        elementId={agent.elementId}
        id={index}
        categoryName={selectedCategory}
        myleName={agent.title}
        description={agent.description}
        image={agent.image}
        navigateTo={`/${agent.detailPage}`}
        mailAddress={email}
      />
    ));
  };

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
          setIsConfirmed(true);
          setMessage("");
          // navigate("/home");
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
      <>
        <TextField
          type="email"
          placeholder="メール"
          label="メールアドレス"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2, width: "50%" }}
        />

        <TextField
          select
          label="関心のあるHRカテゴリ"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          sx={{ mb: 2, width: "70%" }}
        />

        <Box display="flex" gap={2} sx={{ mb: 7, width: "60%" }}>
          <TextField
            type="password"
            placeholder="8文字以上・英大文字/小文字・数字・記号を含めてください"
            label="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                  dispatch(loginSuccess(email));
                  navigate("/home");
                }}
              >
                <Typography variant="h5">Myle一覧へ</Typography>
              </Card>
            </Box>
          </Box>
        )}
      </>
    </Box>
  );
};

export default SignUpEntry;

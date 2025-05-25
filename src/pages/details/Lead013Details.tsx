import React from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AccordionExpandIcon from "../../components/organisms/DeatilNameContainer";
import ProcessContainer from "../../components/organisms/ProcessContainer";
import ResultImageContainer from "../../components/organisms/ResultImageContainer";
import ChatApp from "../../components/organisms/ChatContainer";
import { Send as SendIcon, Help as HelpIcon, Info as InfoIcon } from "@mui/icons-material";

const Lead013Details: React.FC = () => {
  const isShowOutput = useSelector(
    (state: RootState) => state.details.isMyleProcessDone
  );

  // テンプレート一覧
    const templates = [
      {
        messageText: "Aさん向けに個別のリーダー研修プランを作って",
        icon: <SendIcon fontSize="large" />,
        type: "message",
      },
      {
        messageText: "管理職昇格者向けにトレーニングを設計して",
        icon: <HelpIcon fontSize="large" />,
        type: "help",
      },
      {
        messageText: "リーダーシップ課題別に学習内容をカスタマイズして",
        icon: <InfoIcon fontSize="large" />,
        type: "info",
      },
    ];

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
          <AccordionExpandIcon />
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <ProcessContainer />
          </Grid>
          {/* ✅ プロセスが完了したら画像を表示 */}
          {isShowOutput && (
            <Grid item xs={12}>
              <ResultImageContainer />
            </Grid>
          )}
        </Grid>
        <Grid item xs={6}>
          <ChatApp 
          messageTemplates = {templates}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Lead013Details;

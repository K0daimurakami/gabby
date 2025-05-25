import React from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AccordionExpandIcon from "../../components/organisms/DeatilNameContainer";
import ProcessContainer from "../../components/organisms/ProcessContainer";
import ResultImageContainer from "../../components/organisms/ResultImageContainer";
import ChatApp from "../../components/organisms/ChatContainer";
import { Send as SendIcon, Help as HelpIcon, Info as InfoIcon } from "@mui/icons-material";

const Skil023Details: React.FC = () => {
  const isShowOutput = useSelector(
    (state: RootState) => state.details.isMyleProcessDone
  );

  // テンプレート一覧
    const templates = [
      {
        messageText: "Bさん向けにキャリアパス設計をサポートして",
        icon: <SendIcon fontSize="large" />,
        type: "message",
      },
      {
        messageText: "従業員のキャリア目標に合わせた育成プランを作成して",
        icon: <HelpIcon fontSize="large" />,
        type: "help",
      },
      {
        messageText: "社内のキャリア開発セミナーを企画して",
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

export default Skil023Details;

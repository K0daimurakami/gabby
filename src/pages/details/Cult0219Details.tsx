import React from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AccordionExpandIcon from "../../components/organisms/DeatilNameContainer";
import ProcessContainer from "../../components/organisms/ProcessContainer";
import ResultImageContainer from "../../components/organisms/ResultImageContainer";
import ChatApp from "../../components/organisms/ChatContainer";
import { Send as SendIcon, Help as HelpIcon, Info as InfoIcon } from "@mui/icons-material";

const Cult0219Details: React.FC = () => {
  const isShowOutput = useSelector(
    (state: RootState) => state.details.isMyleProcessDone
  );

  // テンプレート一覧
    const templates = [
      {
        messageText: "技術者との会議のアイスブレイク用の話題を最近のニュースから3つ選定して一覧をZOOM背景画像にして欲しい。",
        icon: <SendIcon fontSize="large" />,
        type: "message",
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


export default Cult0219Details;

import React from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AccordionExpandIcon from "../../components/organisms/DeatilNameContainer";
import ProcessContainer from "../../components/organisms/ProcessContainer";
import MussResultImageContainer from "../../components/organisms/MussResultImageContainer";
import ChatApp from "../../components/organisms/ChatContainer";
import {
  Send as SendIcon,
  Help as HelpIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

const Onb001Details: React.FC = () => {
  const detailSliceState = useSelector((state: RootState) => state.details);

  // テンプレート一覧
  const templates = [
    {
      messageText: "新入社員に業務の基本を紹介して",
      icon: <SendIcon fontSize="large" />,
      type: "message",
    },
    {
      messageText: "社内手続きをわかりやすく案内して",
      icon: <HelpIcon fontSize="large" />,
      type: "help",
    },
    {
      messageText: "人事部門の新入社員向けに業務ナレッジを定着させて",
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
          {detailSliceState.isMyleProcessDone && (
            <Grid item xs={12}>
              <MussResultImageContainer />
            </Grid>
          )}
        </Grid>
        <Grid item xs={6}>
          <ChatApp messageTemplates={templates} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Onb001Details;

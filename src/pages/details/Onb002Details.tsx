import React from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AccordionExpandIcon from "../../components/organisms/DeatilNameContainer";
import ProcessContainer from "../../components/organisms/ProcessContainer";
import TeamsResultContainer from "../../components/organisms/TeamsResultContainer";
import ChatApp from "../../components/organisms/ChatContainer";
import {
  Send as SendIcon,
  Help as HelpIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

const Onb002Details: React.FC = () => {
  const detailSliceState = useSelector((state: RootState) => state.details);

  // テンプレート一覧
  const templates = [
    {
      messageText: "Aさんにスキル診断を実施して育成計画を提案して",
      icon: <SendIcon fontSize="large" />,
      type: "message",
    },
    {
      messageText: "新入社員全員のスキルギャップを診断して育成プランを作成して",
      icon: <HelpIcon fontSize="large" />,
      type: "help",
    },
    {
      messageText:
        "スキル診断の結果をもとにフォローが必要な社員に補足研修を案内して",
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
              <TeamsResultContainer />
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

export default Onb002Details;

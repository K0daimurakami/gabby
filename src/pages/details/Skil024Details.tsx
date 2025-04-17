import React from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AccordionExpandIcon from "../../components/organisms/deatilNameContainer";
import ProcessContainer from "../../components/organisms/processContainer";
import ResultImageContainer from "../../components/organisms/resultImageContainer";
import ChatApp from "../../components/organisms/chatContainer";
import { Send as SendIcon, Help as HelpIcon, Info as InfoIcon } from "@mui/icons-material";

const Skil024Details: React.FC = () => {
  const isShowOutput = useSelector(
    (state: RootState) => state.details.isShowOutput
  );

  // テンプレート一覧
    const templates = [
      {
        messageText: "Cさんの業績評価と連動した成長支援プランを提案して",
        icon: <SendIcon fontSize="large" />,
        type: "message",
      },
      {
        messageText: "各部門のパフォーマンス評価結果を反映した育成プランを作成して",
        icon: <HelpIcon fontSize="large" />,
        type: "help",
      },
      {
        messageText: "従業員のパフォーマンス管理プロセスを改善する施策を提案して",
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

export default Skil024Details;

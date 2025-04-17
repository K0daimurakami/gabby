import React from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AccordionExpandIcon from "../../components/organisms/deatilNameContainer";
import ProcessContainer from "../../components/organisms/processContainer";
import ResultImageContainer from "../../components/organisms/resultImageContainer";
import ChatApp from "../../components/organisms/chatContainer";
import { Send as SendIcon, Help as HelpIcon, Info as InfoIcon } from "@mui/icons-material";

const Comp035Details: React.FC = () => {
  const isShowOutput = useSelector(
    (state: RootState) => state.details.isShowOutput
  );

  // テンプレート一覧
    const templates = [
      {
        messageText: "従業員の個人情報を適切に保護する方針を導入して",
        icon: <SendIcon fontSize="large" />,
        type: "message",
      },
      {
        messageText: "プライバシーリスクを最小化するための対策を講じて",
        icon: <HelpIcon fontSize="large" />,
        type: "help",
      },
      {
        messageText: "データ保護のルールを全社員に教育し、遵守を徹底させて",
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

export default Comp035Details;

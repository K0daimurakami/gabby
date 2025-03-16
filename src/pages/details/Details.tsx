import React from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CategoryContainer from "../../components/organisms/CategoryContainer";
import AccordionExpandIcon from "../../components/organisms/deatilNameContainer";
import ProcessContainer from "../../components/organisms/processContainer";
import ResultImageContainer from "../../components/organisms/resultImageContainer";
import ChatApp from "../../components/organisms/chatContainer";

const Home: React.FC = () => {
  const isShowOutput = useSelector(
    (state: RootState) => state.details.isShowOutput
  );
  console.log(isShowOutput);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
          <AccordionExpandIcon />
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <ProcessContainer />
          </Grid>
          {/* ✅ プロセスが完了したら画像を表示 */}
          {isShowOutput && (
            <Grid item xs={12}>
              <ResultImageContainer
                imageUrl="/images/eventNoticeResult.png"
                altText="サンプル画像: 自然風景"
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs={6}>
          <ChatApp />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

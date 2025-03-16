import React from "react";
import { Container, Grid2 } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CategoryContainer from "../../components/organisms/CategoryContainer";
import AccordionExpandIcon from "../../components/organisms/deatilNameContainer";
import ProcessContainer from "../../components/organisms/processContainer";
import ResultImageContainer from "../../components/organisms/resultImageContainer";
import ChatApp from "../../components/organisms/chatContainer";

const Home: React.FC = () => {
  const categoryA = useSelector((state: RootState) => state.home.categoryA);
  const categoryB = useSelector((state: RootState) => state.home.categoryB);

  return (
    <Container>
      <Grid2 container spacing={2}>
        <Grid2 size={12} sx={{ mt: 2, mb: 2 }}>
          <AccordionExpandIcon />
        </Grid2>
        <Grid2 size={6}>
          <Grid2 size={12}>
            <ProcessContainer />
          </Grid2>
          <Grid2 size={12}>
            <ResultImageContainer
              imageUrl="/images/eventNoticeResult.png"
              altText="サンプル画像: 自然風景"
            />
          </Grid2>
        </Grid2>
        <Grid2 size={6}>
          <ChatApp />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Home;

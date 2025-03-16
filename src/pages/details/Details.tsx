import React from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CategoryContainer from "../../components/organisms/CategoryContainer";

const Home: React.FC = () => {
  const categoryA = useSelector((state: RootState) => state.home.categoryA);
  const categoryB = useSelector((state: RootState) => state.home.categoryB);

  return (
    <Container>
      <CategoryContainer title="カテゴリA" items={categoryA} />
      <CategoryContainer title="カテゴリB" items={categoryB} />
    </Container>
  );
};

export default Home;

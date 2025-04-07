import React from "react";
import categoriesData from "../../constants/agent_organization.json";
import AgentCategoryLayout from "../../components/layout/AgentCategoryLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

/**
 * ホームページコンポーネント
 * エージェントカテゴリーを表示する
 */
const Home: React.FC = () => {
  const categories = useSelector((state: RootState) => state.home.categories)
  return <AgentCategoryLayout categories={categories} />;
};

export default Home;

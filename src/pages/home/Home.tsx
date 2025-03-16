import React from "react";
import categoriesData from "../../constants/agent_organization.json";
import AgentCategoryLayout from "../../components/layout/AgentCategoryLayout";

/**
 * ホームページコンポーネント
 * エージェントカテゴリーを表示する
 */
const Home: React.FC = () => {
  return <AgentCategoryLayout categories={categoriesData.categories} />;
};

export default Home;

import React from "react";
import { Box, Typography } from "@mui/material";
import AgentCard from "../molecules/AgentCard";

// エージェント項目の型定義
interface AgentItem {
  title: string;
  description: string;
  image: string;
}

// コンポーネントのプロパティ型定義
interface Props {
  title: string;
  agents: AgentItem[];
}

/**
 * エージェントカテゴリーコンテナコンポーネント
 * 特定のカテゴリーに属するエージェントカードを表示する
 */
const AgentCategoryContainer: React.FC<Props> = ({ title, agents }) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      {/* カテゴリータイトル */}
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      
      {/* エージェントカードのコンテナ - フレックスボックスでラップして表示 */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {agents.map((agent, index) => (
          <AgentCard
            key={index}
            title={agent.title}
            description={agent.description}
            image={agent.image}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AgentCategoryContainer;
import React from "react";
import { Box, Typography } from "@mui/material";
import AgentCard from "../molecules/AgentCard";

// エージェント項目の型定義
interface AgentItem {
  elementId: string;
  title: string;
  description: string;
  image: string;
  detailPage: string; // 遷移先ページのパス（必須）
}

// コンポーネントのプロパティ型定義
interface Props {
  categoryName: string;
  agents: AgentItem[];
}

/**
 * エージェントカテゴリーコンテナコンポーネント
 * 特定のカテゴリーに属するエージェントカードを表示する
 */
const AgentCategoryContainer: React.FC<Props> = ({ categoryName, agents }) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      {/* カテゴリータイトル */}
      <Typography variant="h5" sx={{ backgroundColor: '#E3823D', color: 'white' }}>
        {categoryName}
      </Typography>
      
      {/* エージェントカードのコンテナ - フレックスボックスでラップして表示 */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {agents.map((agent, index) => (
          <AgentCard
            elementId={agent.elementId}
            id={index + 1}
            categoryName={categoryName}
            myleName={agent.title}
            description={agent.description}
            image={agent.image}
            navigateTo={`/${agent.detailPage}`} // detailPageは必須項目
          />
        ))}
      </Box>
    </Box>
  );
};

export default AgentCategoryContainer;
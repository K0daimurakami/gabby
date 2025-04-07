import React from "react";
import { Container, Box, Typography } from "@mui/material";
import AgentCategoryContainer from "../organisms/AgentCategoryContainer";

// TOP画面の各エージェントが持つ項目
interface AgentItem {
  elementId: string;
  title: string;
  description: string;
  image: string;
  detailPage: string; // 遷移先ページのパス（必須）
}

// Note: We're removing the unused Category interface

// エージェントをまとめるカテゴリが持つ項目
interface Props {
  categories: {
    [key: string]: AgentItem[];
  };
  title?: string;
}

/**
 * エージェントカテゴリーレイアウトコンポーネント
 * 複数のカテゴリーコンテナを表示するレイアウト
 */
const AgentCategoryLayout: React.FC<Props> = ({ categories, title }) => {
  return (
    <Container maxWidth="lg">
      {title && (
        <Typography variant="h4" component="h1" gutterBottom sx={{ my: 3 }}>
          {title}
        </Typography>
      )}
      
      <Box sx={{ py: 2 }}>
        {/* カテゴリーごとにAgentCategoryContainerを表示 */}
        {Object.entries(categories).map(([categoryName, agents]) => (
          <AgentCategoryContainer
            key={categoryName}
            categoryName={categoryName}
            agents={agents}
          />
        ))}
      </Box>
    </Container>
  );
};

export default AgentCategoryLayout;
import React from "react";
import { Container, Box, Typography } from "@mui/material";
import AgentCategoryContainer from "../organisms/AgentCategoryContainer";

// エージェント項目の型定義
interface AgentItem {
  title: string;
  description: string;
  image: string;
}

// Note: We're removing the unused Category interface

// コンポーネントのプロパティ型定義
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
            title={categoryName}
            agents={agents}
          />
        ))}
      </Box>
    </Container>
  );
};

export default AgentCategoryLayout;
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Link,
  Box,
} from "@mui/material";

// コンポーネントの Props 型定義
interface PopupMessageProps {
  open: boolean;                // ポップアップの表示状態
  onClose: () => void;          // 「閉じる」ボタンを押したときに呼ばれる関数
  title?: string;               // ダイアログのタイトル（任意）
  message: string;              // 表示するメッセージ
  confirmLabel?: string;        // 確認ボタンのラベル（省略可、デフォルトあり）
}

// 汎用的なポップアップメッセージコンポーネント
const PopupMessage: React.FC<PopupMessageProps> = ({
  open,
  onClose,
  title = "Myleからのお知らせ",              // タイトルにデフォルト値を設定
  message,
  confirmLabel = "OK",           // ボタンのラベルにデフォルト値を設定
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {/* タイトル */}
      <DialogTitle>{title}</DialogTitle>

      {/* 本文メッセージ */}
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      <Box display="flex" justifyContent="center" mt={2}>
          <Link
            href="https://forms.gle/Cj3jv1JmZ9MBb3qBA"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontWeight: "bold",
              color: "#E3823D", // オレンジ色（背景とのコントラスト良）
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            アンケートはこちら
          </Link>
          </Box>

      {/* アクション（ボタン） */}
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupMessage;

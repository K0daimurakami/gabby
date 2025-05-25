import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Avatar, Box, Card, CardMedia, Paper, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PopupMessage from "../molecules/PopupMessage";

const styles = {
  typography: {
    backgroundColor: "#E3823D",
    color: "white",
  },
};

const MussResultImageContainer: React.FC = () => {
  //const outputUrl = useSelector((state: RootState) => state.details.outputUrl);

  //if (!outputUrl) return null; // ✅ 画像が設定されていない場合は何も表示しない

  const [showPopup, setShowPopup] = useState(false);

  // ✅ コンポーネントのマウント後 1 秒後にポップアップを表示
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ backgroundColor: "#E3823D", color: "white" }}
      >
        ◆ 結果
      </Typography>
      <Card sx={{ p: 3, backgroundColor: "#fff" }}>
        {/* Slack画面のラッパー */}
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#fff",
            p: 2,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            ユーザAの画面
          </Typography>
          {/* Slackヘッダー風 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // ← これで縦中央にそろえる
              backgroundColor: "#4A154B",
              color: "#fff",
              px: 2,
              py: 1,
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: 14,
                bgcolor: "#E3823D",
                mr: 1.5, // 少し右にスペース
              }}
            >
              M
            </Avatar>
            <Typography
              variant="subtitle2"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              イベント告知Myle さんとのダイレクトメッセージ
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f0f0f0", // ごく薄いグレー
              borderRadius: "4px",
              px: 2,
              py: 2,
            }}
          >
            {/* Myle のメッセージ行 */}
            <Box display="flex" alignItems="flex-start" mb={1}>
              <Avatar sx={{ bgcolor: "#E3823D", mr: 1 }}>
                <ChatBubbleOutlineIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  イベント告知Myle
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  午後13:00
                </Typography>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    mt: 0.5,
                  }}
                >
                  ユーザAさん、はじめまして。Myleです。
                  9月1日に管理職向け交流会を開催します。
                  URLを確認の上、イベント詳細の確認と参加可否の回答をお願いします。
                  <br />
                  <Typography
                    component="a"
                    href="https://example.com/event/manager-meetup"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "#1a0dab",
                      textDecoration: "underline",
                      mt: 1,
                      display: "inline-block",
                    }}
                  >
                    https://example.com/event/manager-meetup
                  </Typography>
                </Paper>
              </Box>
            </Box>

            {/* スタンプだけの別メッセージ */}
            <Box display="flex" alignItems="flex-start">
              <Avatar sx={{ bgcolor: "#E3823D", mr: 1 }}>
                <ChatBubbleOutlineIcon />
              </Avatar>
              <Box>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    mt: 0.5,
                  }}
                >
                  参加お待ちしてます🎉🙌
                </Paper>
              </Box>
            </Box>
          </Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            ユーザBの画面
          </Typography>
          {/* Slackヘッダー風 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // ← これで縦中央にそろえる
              backgroundColor: "#4A154B",
              color: "#fff",
              px: 2,
              py: 1,
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: 14,
                bgcolor: "#E3823D",
                mr: 1.5, // 少し右にスペース
              }}
            >
              M
            </Avatar>
            <Typography
              variant="subtitle2"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              イベント告知Myle さんとのダイレクトメッセージ
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f0f0f0", // ごく薄いグレー
              borderRadius: "4px",
              px: 2,
              py: 2,
            }}
          >
            {/* Myle のメッセージ行 */}
            <Box display="flex" alignItems="flex-start" mb={1}>
              <Avatar sx={{ bgcolor: "#E3823D", mr: 1 }}>
                <ChatBubbleOutlineIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  イベント告知Myle
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  午後13:00
                </Typography>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    mt: 0.5,
                  }}
                >
                  ひさしぶり！Myleです！
                  以前ユーザBさんに参加いただいた管理職向け交流会を9月1日に開催します！
                  参加可否の回答をお願いします！
                  <br />
                  <Typography
                    component="a"
                    href="https://example.com/event/manager-meetup"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "#1a0dab",
                      textDecoration: "underline",
                      mt: 1,
                      display: "inline-block",
                    }}
                  >
                    https://example.com/event/manager-meetup
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            あなたの画面
          </Typography>
          {/* Slackヘッダー風 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // ← これで縦中央にそろえる
              backgroundColor: "#4A154B",
              color: "#fff",
              px: 2,
              py: 1,
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: 14,
                bgcolor: "#E3823D",
                mr: 1.5, // 少し右にスペース
              }}
            >
              M
            </Avatar>
            <Typography
              variant="subtitle2"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              イベント告知Myle さんとのダイレクトメッセージ
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f0f0f0", // ごく薄いグレー
              borderRadius: "4px",
              px: 2,
              py: 2,
            }}
          >
            {/* Myle のメッセージ行 */}
            <Box display="flex" alignItems="flex-start" mb={1}>
              <Avatar sx={{ bgcolor: "#E3823D", mr: 1 }}>
                <ChatBubbleOutlineIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  イベント告知Myle
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  午後13:01
                </Typography>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    mt: 0.5,
                  }}
                >
                  対象ユーザーへのイベント告知が完了しました。
                  <br />
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
      <PopupMessage
        open={showPopup}
        onClose={handleClose}
        message="ご利用ありがとうございました。"
      />
    </>
  );
};

export default MussResultImageContainer;

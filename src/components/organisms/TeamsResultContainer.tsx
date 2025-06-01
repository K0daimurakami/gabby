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

const TeamsResultContainer: React.FC = () => {
  //const outputUrl = useSelector((state: RootState) => state.details.outputUrl);

  //if (!outputUrl) return null; // ✅ 画像が設定されていない場合は何も表示しない

  const [showPopup, setShowPopup] = useState(false);

  // ✅ コンポーネントのマウント後 1 秒後にポップアップを表示
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

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
      <Card sx={{ p: 3, backgroundColor: "#f4f4f4" }}>
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: "6px",
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
              alignItems: "center",
              backgroundColor: "#f3f2f1",
              borderBottom: "1px solid #ccc",
              px: 2,
              py: 1,
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              mb: 2,
            }}
          >
            <Avatar
              sx={{ width: 28, height: 28, fontSize: 14, bgcolor: "#6264A7", mr: 1.5 }}
            >
              M
            </Avatar>
            <Typography variant="subtitle2" fontWeight="bold">
              イベント告知Myle さんとのチャット
            </Typography>
          </Box>

{/* メッセージエリア */}
<Box sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px", px: 2, py: 2 }}>
            {/* メッセージ1 */}
            <Box display="flex" alignItems="flex-start" mb={2}>
              <Avatar sx={{ bgcolor: "#6264A7", mr: 1 }}>
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
                  elevation={0}
                  sx={{
                    p: 1.5,
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "6px",
                    mt: 0.5,
                  }}
                >
                  こんにちは、ユーザAさん。
                  9月1日に管理職向け交流会を開催します。
                  URLを確認の上、イベント詳細の確認と参加可否の回答をお願いします。
                  <br />
                  <Typography
                    component="a"
                    href="https://example.com/event/manager-meetup"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "#2b88d8",
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

            {/* メッセージ2 */}
            <Box display="flex" alignItems="flex-start">
              <Avatar sx={{ bgcolor: "#6264A7", mr: 1 }}>
                <ChatBubbleOutlineIcon />
              </Avatar>
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "6px",
                    mt: 0.5,
                  }}
                >
                  参加お待ちしてます🎉🙌
                </Paper>
              </Box>
            </Box>
          </Box>          
          
          {/* あなたの画面 */}
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 4, mb: 1 }}>
            あなたの画面
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f3f2f1",
              borderBottom: "1px solid #ccc",
              px: 2,
              py: 1,
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              mb: 2,
            }}
          >
            <Avatar
              sx={{ width: 28, height: 28, fontSize: 14, bgcolor: "#6264A7", mr: 1.5 }}
            >
              M
            </Avatar>
            <Typography variant="subtitle2" fontWeight="bold">
              イベント告知Myle さんとのチャット
            </Typography>
          </Box>

          <Box sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px", px: 2, py: 2 }}>
            <Box display="flex" alignItems="flex-start">
              <Avatar sx={{ bgcolor: "#6264A7", mr: 1 }}>
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
                  elevation={0}
                  sx={{
                    p: 1.5,
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "6px",
                    mt: 0.5,
                  }}
                >
                  対象ユーザーへのイベント告知が完了しました。
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

export default TeamsResultContainer;

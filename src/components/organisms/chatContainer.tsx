import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  sendMessage,
  sendMessageByHelpButton,
} from "../../pages/details/detailsSlice";
import {
  TextField,
  Button,
  Container,
  Paper,
  List,
  ListItem,
  Box,
  Grid,
  Typography,
  LinearProgress,
} from "@mui/material";
import {
  Send as SendIcon,
  Help as HelpIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

const ChatApp = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.details.messages);
  const onProcessing = useSelector((state: RootState) => state.details.onProcessing);
  const [input, setInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // メッセージを送信
  const handleSendMessage = () => {
    if (input.trim()) {
      dispatch(
        sendMessage({
          id: Date.now().toString(),
          sender: "me",
          userName: "User",
          text: input,
        })
      );
      setInput("");
    }
  };

  // テンプレートメッセージを送信
  const handleTemplateClick = (templateText: string) => {
    dispatch(sendMessageByHelpButton(templateText));
    setSelectedTemplate(templateText);
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h5"
        sx={{ backgroundColor: "#E3823D", color: "white" }}
      >
        ◆ チャット画面
      </Typography>
      <Paper
        elevation={3}
        sx={{
          height: "500px",
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        {/* メッセージリスト */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  justifyContent:
                    message.sender === "me" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    display: "inline-block",
                    maxWidth: "75%",
                    padding: "10px 15px",
                    borderRadius: "20px",
                    backgroundColor:
                      message.sender === "me" ? "#DCF8C6" : "#F1CF24",
                    textAlign: message.sender === "me" ? "right" : "left",
                  }}
                >
                  <Box>{message.text}</Box>
                </Box>
              </ListItem>
            ))}
            {onProcessing && (
              <Box sx={{ position: "relative", width: "100%", marginTop: 3 }}>
              <LinearProgress sx={{ width: "100%" }} />
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "gray",
                  backgroundColor: "#fff", // 背景を白に設定
                  padding: "4px 12px", // テキスト周りの余白
                  borderRadius: "8px", // 角を丸める
                }}
              >
                ただいま対応中です！
              </Typography>
            </Box>
            )}
          </List>
        </Box>

        {/* テンプレート選択 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper
                sx={{
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border:
                    selectedTemplate === "message"
                      ? "2px solid #007bff"
                      : "none",
                  "&:hover": { backgroundColor: "#F1CF24" },
                }}
                onClick={() =>
                  handleTemplateClick("AさんとBさんにイベント告知をして")
                }
              >
                <SendIcon fontSize="large" />
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  AさんとBさんにイベント告知をして
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                sx={{
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border:
                    selectedTemplate === "help" ? "2px solid #007bff" : "none",
                  "&:hover": { backgroundColor: "#F1CF24" },
                }}
                onClick={() =>
                  handleTemplateClick(
                    "女性向け産休説明会を女性従業員に告知して"
                  )
                }
              >
                <HelpIcon fontSize="large" />
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  女性向け産休説明会を女性従業員に告知して
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                sx={{
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border:
                    selectedTemplate === "info" ? "2px solid #007bff" : "none",
                  "&:hover": { backgroundColor: "#F1CF24" },
                }}
                onClick={() =>
                  handleTemplateClick("管理職に管理職向けイベントを告知して")
                }
              >
                <InfoIcon fontSize="large" />
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  管理職に管理職向けイベントを告知して
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* メッセージ入力フォーム */}
        <Box sx={{ display: "flex", marginTop: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ marginRight: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            送信
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatApp;

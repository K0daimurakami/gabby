import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Paper, List, ListItem, Box, Grid, Typography } from "@mui/material";
import { Send as SendIcon, Help as HelpIcon, Info as InfoIcon } from "@mui/icons-material";

// JSONからメッセージデータを取得する
const initialMessages = [
  { id: 1, text: "Hello!", sender: "other" },  // 他の人のメッセージ
  { id: 2, text: "How are you?", sender: "other" },  // 他の人のメッセージ
];

// メインコンポーネント
const ChatApp = () => {
  const [messages, setMessages] = useState<Array<{ id: number, text: string, sender: string }>>([]);
  const [input, setInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  // メッセージを送信する関数
  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now(),
        text: input,
        sender: "me", // 自分のメッセージには'sender'を'me'に設定
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]); // 新しいメッセージを追加
      setInput(""); // 入力フィールドをクリア
    }
  };

  // テンプレートを選択する関数
  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ backgroundColor: '#E3823D', color: 'white' }}>
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
            {messages.length > 0 ? (
              messages.map((message) => (
                <ListItem key={message.id} sx={{ justifyContent: message.sender === "me" ? "flex-end" : "flex-start" }}>
                  {/* メッセージのテキスト */}
                  <Box
                    sx={{
                      display: "inline-block",
                      maxWidth: "75%",
                      padding: "10px 15px",
                      borderRadius: "20px",
                      backgroundColor: message.sender === "me" ? "#DCF8C6" : "#F1CF24",
                      position: "relative",
                      textAlign: message.sender === "me" ? "right" : "left",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Box>{message.text}</Box>

                    {/* 吹き出しの尾（しっぽ） */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "-10px",
                        [message.sender === "me" ? "right" : "left"]: "10px",
                        width: 0,
                        height: 0,
                        borderLeft: message.sender === "me" ? "10px solid transparent" : "none",
                        borderRight: message.sender === "me" ? "none" : "10px solid transparent",
                        borderTop: message.sender === "me" ? "10px solid #DCF8C6" : "10px solid #F1CF24",
                      }}
                    />
                  </Box>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Box>No messages yet</Box>
              </ListItem>
            )}
          </List>
        </Box>

        {/* テンプレート選択 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
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
                  border: selectedTemplate === "message" ? "2px solid #007bff" : "none", // 選択時にボーダーを表示
                  "&:hover": {
                    backgroundColor: "#f1f1f1",
                  },
                }}
                onClick={() => handleSelectTemplate("message")}
              >
                <SendIcon fontSize="large" />
                <Typography variant="body2" sx={{ marginTop: 1 }}>〇〇さんと〇〇さんにイベント告知をして</Typography>
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
                  border: selectedTemplate === "help" ? "2px solid #007bff" : "none", // 選択時にボーダーを表示
                  "&:hover": {
                    backgroundColor: "#f1f1f1",
                  },
                }}
                onClick={() => handleSelectTemplate("help")}
              >
                <HelpIcon fontSize="large" />
                <Typography variant="body2" sx={{ marginTop: 1 }}>〇〇イベントを女性従業員に告知して</Typography>
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
                  border: selectedTemplate === "info" ? "2px solid #007bff" : "none", // 選択時にボーダーを表示
                  "&:hover": {
                    backgroundColor: "#f1f1f1",
                  },
                }}
                onClick={() => handleSelectTemplate("info")}
              >
                <InfoIcon fontSize="large" />
                <Typography variant="body2" sx={{ marginTop: 1 }}>管理職に〇〇イベントを告知して</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* メッセージ入力フォーム */}
        <Box sx={{ display: "flex", marginTop: 2 }}>
          <TextField
            label="コメントを入力してください"
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)} // 入力フィールドの値を更新
            sx={{ marginRight: 1 }}
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatApp;

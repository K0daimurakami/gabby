import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Container, Paper, List, ListItem, Box } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';

// JSONからメッセージデータを取得する
const initialMessages = [
  { id: 1, text: "Hello!", sender: "other" },  // 他の人のメッセージ
  { id: 2, text: "How are you?", sender: "other" },  // 他の人のメッセージ
];

// メインコンポーネント
const ChatApp = () => {
  const [messages, setMessages] = useState<Array<{ id: number, text: string, sender: string }>>([]);
  const [input, setInput] = useState("");

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

  return (
    <Container maxWidth="sm">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ChatIcon />
            <Typography variant="h5" gutterBottom>
                チャット画面
            </Typography>
        </Box>
      <Paper elevation={3} sx={{ height: "500px", display: "flex", flexDirection: "column", padding: 2 }}>
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
                      backgroundColor: message.sender === "me" ? "#DCF8C6" : "#FFF",
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
                        borderTop: message.sender === "me" ? "10px solid #DCF8C6" : "10px solid #FFF",
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

        {/* メッセージ入力フォーム */}
        <Box sx={{ display: "flex", marginTop: 2 }}>
          <TextField
            label="Type a message"
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


import React, { useState } from "react";
import { TextField, Button, Container, Paper, List, ListItem, ListItemText, Box } from "@mui/material";

// メインコンポーネント
const ChatApp = () => {
  // メッセージ管理用のステート
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!" },
    { id: 2, text: "How are you?" },
  ]);
  const [input, setInput] = useState("");

  // メッセージを送信する関数
  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now(),
        text: input,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]); // 新しいメッセージを追加
      setInput(""); // 入力フィールドをクリア
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ height: "500px", display: "flex", flexDirection: "column", padding: 2 }}>
        {/* メッセージリスト */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List>
            {messages.length > 0 ? (
              messages.map((message) => (
                <ListItem key={message.id}>
                  <ListItemText primary={message.text} />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No messages yet" />
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

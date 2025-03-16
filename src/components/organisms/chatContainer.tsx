import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { sendMessage } from "../../pages/details/detailsSlice";
import {
  TextField,
  Button,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

const ChatApp = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.details.messages);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      dispatch(
        sendMessage({
          id: Date.now().toString(),
          role: "user",
          userName: "User",
          text: input,
        })
      );
      setInput("");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        チャット画面
      </Typography>
      <Paper elevation={3} sx={{ height: "500px", padding: 2 }}>
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List>
            {messages.map((message) => (
              <ListItem key={message.id}>
                <ListItemText primary={message.text} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ display: "flex", marginTop: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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

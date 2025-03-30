import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { sendMessage, sendMessageByHelpButton } from "../../pages/details/detailsSlice";
import { TextField, Button, Container, Paper, List, ListItem, Box, Grid, Typography } from "@mui/material";
import { Send as SendIcon, Help as HelpIcon, Info as InfoIcon } from "@mui/icons-material";
import TemplateSelector from "../molecules/TemplateMessage";

interface MessageTemplate {
  messageText: string;
  icon: React.ReactNode;
  type: string;
}

interface TemplateSelectorProps {
  messageTemplates: MessageTemplate[];
}

const ChatApp: React.FC<TemplateSelectorProps> = ({
  messageTemplates: messageTemplates,
}) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.details.chatMessages);
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
          chatText: input,
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
                  <Box>{message.chatText}</Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* 入力テンプレート */}
        <TemplateSelector
          templates={messageTemplates}
          selectedTemplate={selectedTemplate}
          onTemplateClick={handleTemplateClick}
        />

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

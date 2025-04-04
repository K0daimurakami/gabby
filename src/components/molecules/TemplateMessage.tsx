import React from "react";
import { Grid, Typography, Paper } from "@mui/material";

interface MessageTemplate {
  messageText: string;
  icon: React.ReactNode;
  type: string;
}

interface TemplateSelectorProps {
  templates: MessageTemplate[];
  selectedTemplate: string | null;
  onTemplateClick: (templateText: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onTemplateClick,
}) => {
  return (
    <Grid container spacing={2}>
      {templates.map((template) => (
        <Grid item xs={4} key={template.type}>
          <Paper
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border:
                selectedTemplate === template.type
                  ? "2px solid #007bff"
                  : "none",
              "&:hover": { backgroundColor: "#F1CF24" },
            }}
            onClick={() => onTemplateClick(template.messageText)}
          >
            {template.icon}
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              {template.messageText}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default TemplateSelector;
import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import CoterraceIcon from "../../components/atoms/CotteraceIcon";

const GlobalMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* ホームアイコン - クリックでトップページに遷移 */}
        <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
          <CoterraceIcon />
        </IconButton>

        {/* タイトル */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gabby
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalMenu;

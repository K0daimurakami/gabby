import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CoterraceIcon from "../../components/atoms/CotteraceIcon";

const GlobalMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ position: "relative" }}>
        {/* ホームアイコン - クリックでトップページに遷移 */}
        <CoterraceIcon onClick={() => navigate("/")} />

        {/* タイトルを中央に配置 */}
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
            color: "#000000"
          }}
        >
          Myles Play Ground
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalMenu;

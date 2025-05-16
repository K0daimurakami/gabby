import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { loginSuccess } from "../../pages/login/userSlice";
import CoterraceIcon from "../../components/atoms/CotteraceIcon";

const GlobalMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ★追加
  const { email } = useSelector((state: RootState) => state.user);

  const handleIconClick = () => {
    if (email) {
      dispatch(loginSuccess(email)); // ★これを追加！
    }
    navigate("/home");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ position: "relative" }}>
        {/* ホームアイコン - クリックでトップページに遷移 */}
        <CoterraceIcon onClick={handleIconClick} />

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

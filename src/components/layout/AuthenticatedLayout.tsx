import { Box, Button, Typography } from "@mui/material";
import GlobalMenu from "../../components/layout/GlobalMenu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../pages/home/userSlice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
  }

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useSelector((state: RootState) => state.user);
  
    const handleLogout = () => {
      dispatch(logout());
      navigate("/signin");
    };
  
    return (
      <>
        <GlobalMenu />
        <Box my={2} p={2} bgcolor="background.paper">
          <Typography>ユーザー: {email}</Typography>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            サインアウト
          </Button>
        </Box>
  
        {/* children をここで表示 */}
        <div>{children}</div>
      </>
    );
  };

export default AuthenticatedLayout;

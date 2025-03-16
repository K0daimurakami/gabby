import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import GlobalMenu from "./components/layout/GlobalMenu";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import { Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalMenu />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;

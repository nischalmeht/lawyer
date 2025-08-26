import React from "react";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LawyerPage from "./pages/LawyerPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import Sidebar from "./pages/sideBar";
import ChatApp from "./pages/ChatApp";

const App = () => {
  const { user: loggedInUser } = useSelector((state) => state.user);

  return (
    <Router>
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        {/* <ChatApp/> */}
        {/* <Sidebar/> */}


        <Routes>
          <Route path="/" element={<LawyerPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<ChatApp loggedInUser={loggedInUser} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

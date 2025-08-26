
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLawyers, logout } from '../store/slice/userSlice';
import { createChat, fetchChats, setMessages, addMessage } from '../store/slice/chatSlice';
import ChatSidebar from '../components/ChatSidebar';
import ChatMessages from '../components/ChatMessages';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const ChatApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, user: loggedInUser, isAuthenticated, lawyers,loginData } = useSelector((state) => state.user);
  const { chats, selectedChat, messages, } = useSelector((state) => state.chat);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const selectedUserObject = useMemo(() => {
    if (!selectedUser) return null;
    const allAvailableUsers = [...users, ...lawyers];
    return allAvailableUsers.find(u => u._id === selectedUser);
  }, [selectedUser, users, lawyers]);

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    if (loginData?._id) {
      const newSocket = io("http://localhost:5000", {
        query: { userId: loginData._id },
      });
      setSocket(newSocket);

      newSocket.on("getOnlineUser", (users) => {
 
        setOnlineUsers(users);
      });

      newSocket.on("newMessage", (newMessage) => {
        dispatch(addMessage(newMessage));
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [loginData?._id, dispatch]);

  useEffect(() => {
    if (socket && selectedChat) {
      socket.emit("joinChat", selectedChat);
      
    }
  }, [socket, selectedChat]);

  useEffect(() => {
    dispatch(fetchLawyers());
    dispatch(fetchChats());
  }, [isAuthenticated, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCreateChat = (otherUser) => {
    dispatch(createChat(otherUser._id));
    setSelectedUser(otherUser._id);
    setShowAllUsers(false);
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        showAllUsers={showAllUsers}
        setShowAllUsers={setShowAllUsers}
        users={users}
        loggedInUser={loggedInUser}
        chats={chats}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleLogout={handleLogout}
        createChat={handleCreateChat}
        onlineUsers={onlineUsers}
        lawyers={lawyers}
      />
      <ChatMessages
        selectedChat={selectedChat}
        messages={messages}
        loggedInUser={loggedInUser}
        selectedUser={selectedUserObject}
        setSelectedUser={setSelectedUser}
        setSidebarOpen={setSidebarOpen}
        setSelectedChat={selectedChat}
        setLoginData={loginData}
        onlineUsers={onlineUsers}
      />
    </div>
  );
};

export default ChatApp;

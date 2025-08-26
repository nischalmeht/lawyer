import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
// import { userSlice } from "./userSlice";
// import { fetchChats } from "./chatSlice";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    chats: [],
    selectedChat: null,
    messages: [],
  },
  reducers: {
    createChatRequest(state) {
      state.loading = true;
    },
    createChatSuccess(state, action) {
      state.loading = false;
      state.selectedChat = action.payload.chatId;
    },
    createChatFailed(state) {
      state.loading = false;
    },

    fetchChatsRequest(state) {
      state.loading = true;
    },
    fetchChatsSuccess(state, action) {
      state.loading = false;
      state.chats = action.payload;
    },
    fetchChatsFailed(state) {
      state.loading = false;
    },

    clearChatErrors(state) {
      state.loading = false;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...(state.messages || []), action.payload];
    },
    moveChatToTop: (state, action) => {
      const { chatId, newMessage, updatedUnseenCount } = action.payload;
      const updatedChats = [...state.chats];
      const chatIndex = updatedChats.findIndex((chat) => chat.chat._id === chatId);

      if (chatIndex !== -1) {
        const [moveChat] = updatedChats.splice(chatIndex, 1);
        const updatedChat = {
          ...moveChat,
          chat: {
            ...moveChat.chat,
            latestMessage: {
              text: newMessage.text,
              sender: newMessage.sender,
            },
            updatedAt: new Date().toString(),
            unseenCount:
              updatedUnseenCount && newMessage.sender !== state.user?._id
                ? (moveChat.chat.unseenCount || 0) + 1
                : moveChat.chat.unseenCount || 0,
          },
        };
        updatedChats.unshift(updatedChat);
        state.chats = updatedChats;
      }
    },
    resetUnseenCount: (state, action) => {
      const chatId = action.payload;
      state.chats = state.chats.map((chat) => {
        if (chat.chat._id === chatId) {
          return {
            ...chat,
            chat: {
              ...chat.chat,
              unseenCount: 0,
            },
          };
        }
        return chat;
      });
    },
  },
});

export const { clearChatErrors, moveChatToTop, resetUnseenCount, setMessages,addMessage } = chatSlice.actions;

export const fetchMessages = (chatId) => async (dispatch) => {
  dispatch(chatSlice.actions.fetchChatsRequest()); // Reusing fetchChatsRequest for loading state
  try {
    const response = await axios.get(
      `http://localhost:5000/api/message/${chatId}`,
      {
        withCredentials: true, // ✅ send cookies
        headers: { "Content-Type": "application/json" },
      }
      
    );
    dispatch(chatSlice.actions.setMessages(response.data.messages));
    // dispatch(userSlice.actions.setUser(response.data.user)); // Assuming user data is returned with messages
    dispatch(fetchChats());
  } catch (error) {
    dispatch(chatSlice.actions.fetchChatsFailed()); // Reusing fetchChatsFailed
    toast.error(error.response?.data?.message || "Failed to load messages");
  } finally {
    dispatch(chatSlice.actions.clearChatErrors());
  }
};

export const createChat = (otherUserId) => async (dispatch) => {
  dispatch(chatSlice.actions.createChatRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/chat/new",
      { otherUserId },
      {
        withCredentials: true, // ✅ send cookies
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(chatSlice.actions.createChatSuccess(response.data));
    dispatch(fetchMessages(response.data.chatId));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(chatSlice.actions.createChatFailed());
    toast.error(error.response?.data?.message || "Failed to create chat");
  } finally {
    dispatch(chatSlice.actions.clearChatErrors());
  }
};

export const fetchChats = () => async (dispatch) => {
  dispatch(chatSlice.actions.fetchChatsRequest());
  try {
    const response = await axios.get("http://localhost:5000/api/chat/all", {
      withCredentials: true, // ✅ cookies go automatically
    });

    dispatch(chatSlice.actions.fetchChatsSuccess(response.data.chats));
  } catch (error) {
    dispatch(chatSlice.actions.fetchChatsFailed());
    toast.error(error.response?.data?.message || "Failed to fetch chats");
  } finally {
    dispatch(chatSlice.actions.clearChatErrors());
  }
};

export const sendMessage = ({chatId, text, image}) => async (dispatch) => {

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/message",
      { chatId, text, image },
     {
      withCredentials: true, 
      headers: { "Content-Type": "application/json" },
     }
    );
    dispatch(chatSlice.actions.addMessage(data.message));
    const displayText = image ? "📷 image" : text;
    dispatch(chatSlice.actions.moveChatToTop({
      chatId,
      newMessage: { text: displayText, sender: data.sender },
      updatedUnseenCount: false,
    }));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send message");
  }
};


export default chatSlice.reducer;

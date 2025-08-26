import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    selectedUser:null,
    user: {},
    loginData:{},
    users: [],
    lawyers:[],
  },
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loginData = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
    fetchUsersRequest(state, action) {
      state.loading = true;
      state.users = [];
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;

    },
    fetchUsersFailed(state, action) {
      state.loading = false;
      state.users= {};
    },
    fetchLawyersRequest(state, action) {
      state.loading = true;
      state.lawyers = [];
    },
    fetchLawyersSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.lawyers = action.payload;

    },
    fetchLawyersFailed(state, action) {
      state.loading = false;
      state.lawyers= {};
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    setSelectedUser:(state,action)=>{
      state.selectedUser = action.payload;
  },
     clearAllErrors(state, action) {
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated; 
      state.loading = false;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/users/logout",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const fetchLawyers = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLawyersRequest());
  try {
    const response = await axios.get("http://localhost:5000/api/users/get-all-lawyers", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.fetchLawyersSuccess(response.data.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchLawyersFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error(error);
  }
};


export default userSlice.reducer;
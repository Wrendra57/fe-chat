import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "chat",
  storage,
};

const initialState = {
  listRoom: {},
  selectedRoom: "",
  headerChat: {},
  allChat: {},
};

export const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addListRoom: (state, { payload }) => {
      state.listRoom = payload;
    },
    addSelectedRoom: (state, { payload }) => {
      state.selectedRoom = payload;
    },
    addHeaderChat: (state, { payload }) => {
      state.headerChat = payload;
    },
    addAllChat: (state, { payload }) => {
      state.allChat = payload;
    },
    emptySelectedRoom: (state, { payload }) => {
      state.selectedRoom = "";
    },
    emptyListRoom: (state) => {
      state.listRoom = {};
    },
    emptyHeaderChat: (state) => {
      state.headerChat = {};
    },
    emptyAllChat: (state) => {
      state.allChat = {};
    },
  },
});

export const {
  addListRoom,
  emptyListRoom,
  addSelectedRoom,
  emptySelectedRoom,
  addAllChat,
  addHeaderChat,
  emptyAllChat,
  emptyHeaderChat,
} = slice.actions;

export const chatPersistReducer = persistReducer(persistConfig, slice.reducer);

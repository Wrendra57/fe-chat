import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "chat",
  storage,
};

const initialState = {
  listRoom: {},
};

export const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addListRoom: (state, { payload }) => {
      state.listRoom = payload;
    },
    emptyListRoom: (state) => {
      state.listRoom = {};
    },
  },
});

export const { addListRoom, emptyListRoom } = slice.actions;

export const chatPersistReducer = persistReducer(persistConfig, slice.reducer);

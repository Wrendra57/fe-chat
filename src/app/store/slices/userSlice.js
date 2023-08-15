// import { createSlice } from "@reduxjs/toolkit"
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';

// const persistConfig = {
// 	key: 'user',
// 	storage,
// }

// const initialState = {
// 	current: {},
// }

// export const slice = createSlice({
// 	name: "user",
// 	initialState,
// 	reducers: {
// 		addUser: (state, { payload }) => {
// 			state.current = payload
// 		},
// 		emptyUser: (state) => {
// 			state.current = {}
// 		},
// 	}
// })

// export const {
// 	addUser,
// 	emptyUser
// } = slice.actions

// export const userPersistReducer = persistReducer(persistConfig, slice.reducer)
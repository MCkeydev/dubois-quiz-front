import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice';
import initReducer from './slices/initSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		init: initReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

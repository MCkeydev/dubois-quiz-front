import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/interfaces';

interface IUserSliceState {
    user: UserType | null;
}

// Define the initial state using that type
const initialState: IUserSliceState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload;

            return state;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

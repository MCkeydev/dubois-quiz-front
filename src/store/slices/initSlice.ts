import { createSlice } from '@reduxjs/toolkit';

interface IInitSlice {
    init: boolean;
}

// Define the initial state using that type
const initialState: IInitSlice = {
    init: true,
};

/**
 * Slice storing the initialisation state of the app.
 * Defaults to true.
 * it is sets to false when the app has made all the action necessary for its initialisation
 * (e.g. checking if the user is authenticated, loading resources...)
 */
export const initSlice = createSlice({
    name: 'init',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setInitEnd: (state) => {
            state.init = false;

            return state;
        },
        setInitStart: (state) => {
            state.init = true;

            return state;
        },
    },
});

export const { setInitEnd, setInitStart } = initSlice.actions;

export default initSlice.reducer;

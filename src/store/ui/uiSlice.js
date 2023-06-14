import { createSlice } from '@reduxjs/toolkit';
                                                
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        listMain: {},
        ids: []
    },
    reducers: {
        fillList: (state, action) => {
            state.listMain = action.payload;
        },
        onIds: (state, action) => {
            state.ids = action.payload;
        }
    }
});
// Action creators are generated for each case reducer function
export const { fillList, onIds } = uiSlice.actions;
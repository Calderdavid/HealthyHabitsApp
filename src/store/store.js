import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { uiSlice } from "./ui/uiSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
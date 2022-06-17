import React from 'react';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/AuthSlice'
import relayReducer from './reducers/RelaySlice'
import {apiSlice} from "../api/ApiSlice";

const rootReducer = combineReducers({
    authReducer,
    relayReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
})

export const setupStore = () => {
    return configureStore ({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(apiSlice.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
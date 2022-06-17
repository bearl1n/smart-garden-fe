import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store";
import {AuthState} from "../../models/AuthState";
import {AuthResponse} from "../../models/AuthResponse";

const initialState: AuthState = {
    user: '',
    token: '',
    refreshToken: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserCredentials: (state, action) => {
           //const { user, accessToken ,refreshToken, expiredDate  } = action.payload
            state.user = action.payload.user
            state.token = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            localStorage.setItem("userCredentials", JSON.stringify({
                    user: action.payload.accessToken,
                    token: action.payload.refreshToken,
                    refreshToken: action.payload.refreshToken
                })
            );

        },
        logOut: (state) => {
            localStorage.clear();
            state.user = ''
            state.token = ''
        }
    },
})

export const { setUserCredentials, logOut } = authSlice.actions
export const selectAuth = (state: RootState) => state.authReducer;
export const selectCurrentUser = (state: RootState ) => state.authReducer.user
export const selectCurrentToken = (state: RootState) => state.authReducer.token
export const selectRefreshToken = (state: RootState) => state.authReducer.refreshToken

export default authSlice.reducer
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../index";

const LOCAL_STORAGE_AUTH= 'USER_AUTH'

export interface AuthState {
    user: string
    token: string
    refreshToken: string
}

const initialState: AuthState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH) ?? '{}')


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.refreshToken = action.payload.refreshToken
            localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify({
                    user: action.payload.user,
                    token: action.payload.token,
                    refreshToken: action.payload.refreshToken
                })
            );

        },
        removeAuth: (state) => {
            localStorage.clear();
            state.user = ''
            state.token = ''
        }
    },
})


export  const authActions = authSlice.actions
export  const authReducer = authSlice.reducer


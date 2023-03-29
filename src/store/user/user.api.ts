import {apiSlice} from "../api.slice";
import {AuthState} from "./user.slice";
import {IAuthRequest, IUserRegisterRequest} from "../../models/models";

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<AuthState, IAuthRequest>({
            query: (credentials: IAuthRequest) => ({
                url: '/api/v1/auth/login',
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation<AuthState,IUserRegisterRequest>({
            query: (userRegInfo: IUserRegisterRequest) => ({
                url: '/api/v1/auth/register',
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: { ...userRegInfo }
            })
        }),
        forgot: builder.mutation<AuthState,IAuthRequest>({
            query: (userRegInfo: IAuthRequest) => ({
                url: '/api/v1/auth/forgot',
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: { ...userRegInfo }
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation } = authApi
import { apiSlice } from "./ApiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/user/login',
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {useLoginMutation } = authApiSlice
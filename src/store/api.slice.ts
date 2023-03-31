import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import {authActions, AuthState} from "./user/user.slice";
import {RootState} from "./index";


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://62.217.180.135:8080',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions)

        if (result.error && result.error.status === 403) {
            api.dispatch(authActions.removeAuth())
        }
        if (result.error && result.error.status === 401) {
            console.log('sending refresh token')
            console.log('api: ' + JSON.stringify(api))
            console.log('extraOptions: ' + JSON.stringify(extraOptions))
            // send refresh token to get new access token
            const refreshResult = await baseQuery('/refresh', api, extraOptions)
            console.log(refreshResult)
            if (refreshResult?.data) {
                // store the new token
                let state: AuthState = JSON.parse(JSON.stringify(refreshResult.data));
                api.dispatch(authActions.setAuth(state))
                // api.dispatch(setAuth(state))
                // retry the original query with new access token
                result = await baseQuery(args, api, extraOptions)
            } else {
                api.dispatch(authActions.removeAuth())
            }
        }

        return result
    }

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
import {IDevice} from "../models/IDevice";
import {apiSlice} from "./ApiSlice";
import {IOrder} from "../models/IOrder";

const apiWithTag = apiSlice.enhanceEndpoints({addTagTypes: ['OrderTag']})

export const deviceApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        getDevices: build.query<IDevice[], number>({
            query: (id) => ({ url: `/user/${id}/devices` }),
            extraOptions: {
                maxRetries: 8,
                providesTags: ['OrderTag']
            }, // You can override the retry behavior on each endpoint
        }),

        setOrder: build.mutation<void, IOrder>({
            query: ( order) => (
                {
                url: `/orders/`,
                headers: {'Content-Type': 'application/json'},
                method: "POST",
                body: order
            }),
            extraOptions: {
                maxRetries: 8,
                invalidatesTags: ['OrderTag']
            }
        }),
    })
})


export const { useGetDevicesQuery, useSetOrderMutation } = deviceApiSlice;

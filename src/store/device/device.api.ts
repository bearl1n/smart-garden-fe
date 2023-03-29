import {apiSlice} from "../api.slice";
import {AuthState} from "../user/user.slice";
import {
    IAuthRequest,
    IDeviceRemoveRequest, IDeviceResponseList, IDevicesRelayRequest,
    IDeviceUserLinkRequest, IOrderDevicesRelayResponse, IOrdersDevicesRelayRequest,
    IUserRegisterRequest
} from "../../models/models";

export const deviceApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addDeviceUserLink: builder.mutation<void, IDeviceUserLinkRequest>({
            query: (serialNumber: IDeviceUserLinkRequest) => ({
                url: '/api/v1/device/add/user/link',
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: { ...serialNumber }
            })
        }),
        removeDevice: builder.mutation<void,IDeviceRemoveRequest>({
            query: (deviceId: IDeviceRemoveRequest) => ({
                url: '/api/v1/device/',
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE',
                body: { ...deviceId }
            })
        }),
        fetchDevice: builder.query<IDeviceResponseList, void>({
            query: () => ({
                url: '/api/v1/device/',
                headers: {'Content-Type': 'application/json'},
                method: 'GET'
            })
        }),
        createDevice: builder.mutation<AuthState,IAuthRequest>({
            query: (userRegInfo: IAuthRequest) => ({
                url: '/api/v1/device/',
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: { ...userRegInfo }
            })
        }),
        createOrdersDevicesRelay: builder.mutation<void,IDevicesRelayRequest>({
            query: (deviceInfo: IDevicesRelayRequest) => ({
                url: `/api/v1/device/${deviceInfo.deviceId}/relay/${deviceInfo.relayId}`,
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: { ...deviceInfo.relay }
            })
        }),
        fetchOrdersDevicesRelay: builder.query<IOrderDevicesRelayResponse,IOrdersDevicesRelayRequest>({
            query: (deviceInfo: IOrdersDevicesRelayRequest) => ({
                url: `/api/v1/device/${deviceInfo.deviceId}/relay/${deviceInfo.relayId}`,
                headers: {'Content-Type': 'application/json'},
                method: 'GET'
            })
        }),

    })
})

export const {useFetchDeviceQuery, useFetchOrdersDevicesRelayQuery, useCreateOrdersDevicesRelayMutation} = deviceApi
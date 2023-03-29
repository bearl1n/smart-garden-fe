export interface IAuthRequest {
    email: string
    password: string
}

export interface IUserRegisterRequest {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface IDeviceUserLinkRequest {
    serialNumber: string
}

export interface IDeviceRemoveRequest {
    deviceId: number
}

export interface IDeviceResponseList {
    devices: IDevice[]
}

export interface IDevice {
    id: number
    deviceType?: string
    inTopicName?: string
    deviceName?: string
    serialNumber?: string
    isActive?: string
    relayList?: IRelay[]
}

export interface IRelay {
    id: number
    name?: string
    status?: boolean
}

export interface IDevicesRelayRequest {
    deviceId: number
    relayId: number
    relay: IRelay
}

export interface IOrderDevicesRelayResponse {
    id?: number
    deviceId?: number
    relayId?: number
    orderStatus?: string
    relayStatus?: boolean
    starDate?: string
    endDate?: string
}

export interface IOrdersDevicesRelayRequest {
    deviceId: number
    relayId: number
}
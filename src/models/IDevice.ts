export interface IDevice {
    deviceId: number;
    type: string;
    relay: IRelay[];
}

export interface IRelay {
    relayId: number;
    type: string;
    status: boolean;
}

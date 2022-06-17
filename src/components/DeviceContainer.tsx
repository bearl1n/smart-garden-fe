import { Button } from "@mui/material";
import React, {useEffect, useState} from "react";
import {deviceApiSlice} from "../api/DeviceApiSlice";
import DeviceItem from "./DeviceItem";
import {IDevice} from "../models/IDevice";
import {toast} from "react-toastify";
import {setUserCredentials} from "../store/reducers/AuthSlice";
import {useAppDispatch} from "../hooks/redux";
import {setRelay} from "../store/reducers/RelaySlice";

const DeviceContainer = () => {

    const dispatch = useAppDispatch()

    const userId = 3;
    const { data: devices,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            error: loginError
    } = deviceApiSlice.useGetDevicesQuery( userId, {pollingInterval: 30_000})

    useEffect( () => {
            if (isLoginSuccess) {
                toast.success("User login successfully")
            }
        }, [isLoginSuccess]

    )




    return (
        <div>
            <div className="post__list">
                {devices && devices.map(device =>
                    <DeviceItem key={device.deviceId}  device = {device}/>
                )}
            </div>
        </div>
    )
}

export default DeviceContainer;
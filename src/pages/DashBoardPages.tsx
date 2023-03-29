
import React, {useEffect, useState} from "react";
import {LoginForm} from "../component/LoginForm";
import {useFetchDeviceQuery} from "../store/device/device.api";
import {DeviceRepo} from "../component/DeviceRepo";


export function DashBoardPage() {
    const  {isLoading, isSuccess, data} = useFetchDeviceQuery()

    useEffect( () => {
            if (isSuccess) {
                console.log(data)
            }
        }, [isSuccess]
    )

    return (
        <div>
        <LoginForm/>
        {isLoading &&  <p>Loading</p>}


            { data?.devices?.map(device => (
                <DeviceRepo device={device} key={device.id}/>
            ))}
        </div>
    )

}
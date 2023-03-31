
import React, {useEffect, useState} from "react";
import {LoginForm} from "../component/LoginForm";
import {useAddDeviceUserLinkMutation, useFetchDeviceQuery, useLazyFetchDeviceQuery} from "../store/device/device.api";
import {DeviceRepo} from "../component/DeviceRepo";
import {Button, Form, Input} from "antd";
import {IDeviceResponseList, IDeviceUserLinkRequest, IUserRegisterRequest} from "../models/models";
import {useLoginMutation} from "../store/user/user.api";


export function DashBoardPage() {
    const   {isLoading, isSuccess, data}= useFetchDeviceQuery()
    const  [fetchDevices, {isLoading: isLazyLoading, isSuccess:  isLazySuccess, data: deviceInfo}]= useLazyFetchDeviceQuery()
    const [serialNumber, setSerialNumber] = useState("")
    const [addLinkDevice,{isSuccess: isSuccessLinkDevice}] = useAddDeviceUserLinkMutation()
    const [isDevices, setIsDevices] = useState<boolean>(false);
    const [deviceList, setDeviceList] = useState<IDeviceResponseList>();

    useEffect( () => {
            if (isSuccess) {
                console.log(data)
                if (data.devices.length>0) {
                    setDeviceList(data)
                }
            }
            if (isLazySuccess) {
              setDeviceList(deviceInfo)
            }

            if(isSuccessLinkDevice) {
                console.log("link")
                fetchDevices();
            }
        }, [isSuccess, isSuccessLinkDevice, deviceInfo, deviceList, fetchDevices]
    )

    const clickHandler = async () => {
        if (serialNumber) {
            await addLinkDevice({serialNumber });
        } else {
            console.log("Please fill all input field")
        }
    }

    return (

        <div>
            <Form className={"mt-4 px-10 h-4 w-1/3"}>
                <Form.Item>
                    <Input
                        placeholder={"Enter serial number "}
                        className={"border rounded-2xl py-2 px-2 w-full h-[42px] mb-2"}
                        value={serialNumber}
                        onChange={e => setSerialNumber(e.target.value)}
                    ></Input>
                    <Button className={"loginform"} onClick={clickHandler} >Add</Button>
                </Form.Item>
            </Form>


            { deviceList?.devices?.map(device => (
                <DeviceRepo device={device} key={device.id}/>
            ))}

        </div>
    )

}
import {IDevice} from "../models/models";
import {useState} from "react";
import {RelayRepo} from "./RelayRepo";
import {Card} from "antd";


interface DeviceProps {
    device: IDevice
}
export function DeviceRepo(props: DeviceProps) {
    console.log(props.device?.relayList?.toString())

    const [details, setDetails] = useState(false)
    const btnBgClassName = details ? 'bg-yellow-400' : 'bg-blue-400'
    const btnClasses = ['py-2 px-4 border', btnBgClassName]

    return (
        <div className={"border py-2 px-4 rounded flex flex-col items-center mb-2"}>
            <Card title={props.device.deviceName}>
            <h6>type:</h6> <span> {props.device.deviceType}</span>
            <h6>serial number: {props.device.serialNumber}</h6>
            <h6>mqtt topic: {props.device.inTopicName}</h6>
            <h6>axtive: {props.device.isActive}</h6>

            <button className={btnClasses.join(' ')}
                    onClick={()=> setDetails(prev => !prev)}>
                { details ? 'Hide Relay' : 'Show Relay'}
            </button>
            {details && <div>
                <p>Relay:
                    {props.device.relayList?.
                    map(relay =>
                        <RelayRepo deviceId={props.device.id} relay={ relay} key={relay.id}></RelayRepo>)
                    }
                </p>
            </div>}
            </Card>
        </div>


    )
}
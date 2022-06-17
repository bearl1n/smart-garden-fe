import {Button, Card, CardActions, CardContent, FormControlLabel, Switch, Typography} from "@mui/material";
import React, { FC, useState } from "react";
import {IDevice, IRelay} from "../models/IDevice";
import RelayItem from "./RelayItem";
import {deviceApiSlice} from "../api/DeviceApiSlice";
import {IOrder} from "../models/IOrder";

interface DeviceItemProps {
    device: IDevice;
}

const DeviceItem: FC<DeviceItemProps> = ({device}) => {

    console.log('device:', device.deviceId)
    console.log('device type:', device.type)

    const [setOrder, {}] = deviceApiSlice.useSetOrderMutation()
    //
    const handleChange = (relay: IRelay)  => {
         console.log('relay status', relay.status.toString())
         setOrder( {relayId: relay.relayId, relay: relay.type, command: !relay.status } as IOrder)
         console.log(relay.status ? "ON": "OFF")
    }
    // const handlerRelay =  async () => {
    //     await createPost( "123")
    // }



    return (

        <Card sx={{ width: 1/4, boxShadow: 3,  m: 5,  p: 1}}>
            <CardContent>
                <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                    type
                </Typography>
                <Typography variant="h5" component="div">
                    {device.deviceId}. {device.type}
                    {device.relay.map(relay =>
                        <RelayItem  change = {handleChange} key={relay.relayId}  relay = {relay}/>

                    )}
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    )
}

export default DeviceItem;
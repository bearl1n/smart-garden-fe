import {Button, Card, CardActions, CardContent, FormControlLabel, FormGroup, Switch, Typography} from "@mui/material";
import React, {FC, useEffect, useState} from "react";

import {IRelay} from "../models/IDevice";
import {deviceApiSlice} from "../api/DeviceApiSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {selectCurrentToken} from "../store/reducers/AuthSlice";
import {IOrder} from "../models/IOrder";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import relaySlice from "../store/reducers/RelaySlice";

interface RelayItemProps {
    relay: IRelay;
    change: (relay: IRelay) => void;
}

const RelayItem: FC<RelayItemProps> = ({relay,change}) => {

    console.log("ddd", relay.status.toString())
    const [relayCheck, setRelayCheck] = useState<boolean>(relay.status)
    const [setOrder, {}] = deviceApiSlice.useSetOrderMutation()

    const  { relayId, type, status } = useAppSelector(state => state.relayReducer)
    //const  {} = useSelector( (state: RootState) => state.relayReducer)
   // const { setRelay } = relaySlice.actions;

    const updateRelay = () => {
        if (relayCheck !== relay.status) {
             setRelayCheck(relay.status)
        }
        console.log("ddd3", relay.status.toString())
    }
    const dispatch = useAppDispatch()

    useEffect( () => {
        setRelayCheck(relay.status)
        console.log("ddd1", relay.status.toString())
    }, [])

    const handlerRelay =  async (e: any) => {
        setRelayCheck(e.target.checked)
       // change(relay)
        await setOrder( {relayId: relay.relayId, relay: relay.type, command: !relayCheck } as IOrder)
    };

    return (

     <div>
         {/*<div> relayId: {relay.relayId}</div>*/}
         {/*<div> relay type: {relay.type}</div>*/}
         {/*<div> relay status: {relay.status.toString()}</div>*/}
         <FormControlLabel control= {<Switch  checked={relayCheck}  onChange = {handlerRelay}  />} label={relay.type} />
     </div>
    )
}

export default RelayItem;
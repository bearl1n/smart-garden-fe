import {IDevice, IDevicesRelayRequest, IOrdersDevicesRelayRequest, IRelay} from "../models/models";
import {MouseEventHandler, useEffect, useState} from "react";
import {useCreateOrdersDevicesRelayMutation, useFetchOrdersDevicesRelayQuery} from "../store/device/device.api";

interface RelayProps {
    deviceId: number
    relay: IRelay
}
export function RelayRepo({deviceId : deviceNumber, relay}: RelayProps) {
    console.log(relay?.name)
    const [details, setDetails] = useState(false)
    const btnBgClassName = details ? 'bg-yellow-400' : 'bg-blue-400'
    const btnClasses = ['py-2 px-4 border', btnBgClassName]
    const [isEnabledRelay, setIsEnabledRelay] = useState(relay.status)
    const [orderStatus, setOrderStatus] = useState('')
    const [expectedStatus, setExpectedStatus] = useState('')


    const [createOrder, { isLoading: areReposLoading, data: repos}] = useCreateOrdersDevicesRelayMutation()
    const {isFetching,
        data: ordersInfo,
           isSuccess: isFetchOrderSuccess,
           isError: isFetchOrderError} =
        useFetchOrdersDevicesRelayQuery({deviceId: deviceNumber, relayId: relay.id} as IOrdersDevicesRelayRequest, {pollingInterval: 60_000})


    useEffect( () => {
            if(isFetching) {
                console.log("isFetching")
            }
            if (isFetchOrderSuccess) {
                console.log("Long polling success")
                console.log(JSON.stringify(ordersInfo))
                if( ordersInfo.orderStatus ){
                    setOrderStatus(ordersInfo.orderStatus)
                    setExpectedStatus(JSON.stringify(ordersInfo.relayStatus))
                }

                if(ordersInfo.orderStatus === "SUCCESS") {
                    setIsEnabledRelay(ordersInfo.relayStatus)
                }
            }
        }, [isFetchOrderSuccess, isFetching, createOrder, orderStatus, expectedStatus, isEnabledRelay]

    )

    const clickHandler = async (e: any ) => {
      try {
          console.log("click handler" + JSON.stringify( !isEnabledRelay))
          let relayRequest: IRelay = {id: relay.id, name: relay.name, status: !isEnabledRelay}
          let request: IDevicesRelayRequest = {
              deviceId: deviceNumber,
              relayId: relay.id,
              relay: relayRequest
          }
          console.log(JSON.stringify(relayRequest))
          await createOrder(request)
      } catch (e) {
          console.log(e)
      }
      setIsEnabledRelay(!isEnabledRelay)

    }


    // @ts-ignore
    return (
        <div className={"border py-2 px-4 rounded flex flex-col items-center mb-2"}>
            <p>Relay Name: {relay.name}</p>
            <h6>status: { JSON.stringify( relay.status)}</h6>
            {orderStatus && isFetchOrderSuccess &&
                <div>
                    <li> Order status : {orderStatus}</li>
                    <li> Expected status: {expectedStatus}</li>
                </div>

            }

            <button className={btnClasses.join(' ')}
                    onClick = {clickHandler}
                    >
                { isEnabledRelay ? 'OFF' : 'ON'}
            </button>


        </div>


    )
}
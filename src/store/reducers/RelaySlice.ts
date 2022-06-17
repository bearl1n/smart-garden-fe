import {AuthState} from "../../models/AuthState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {IDevice, IRelay} from "../../models/IDevice";

const initialState: IRelay = {
    relayId: 0,
    type: '',
    status: false
}


const relaySlice = createSlice({
    name: 'relay',
    initialState,
    reducers: {
        setRelay: (state, action:PayloadAction<IRelay>) => {
            //const { user, accessToken ,refreshToken, expiredDate  } = action.payload
            state.relayId = action.payload.relayId
            state.type = action.payload.type
            state.status = action.payload.status

        }
    },
})

export const { setRelay } = relaySlice.actions;
export const selectRelay = (state: RootState) => state.relayReducer;

export default relaySlice.reducer
import React from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {logOut, selectAuth, selectCurrentToken, setUserCredentials} from "../store/reducers/AuthSlice";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import DeviceContainer from "../components/DeviceContainer";
import relaySlice from "../store/reducers/RelaySlice";

const DashBoard = () => {
    const token  = useAppSelector(selectCurrentToken)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();



    const handleLogout = () => {
      dispatch(logOut());
      toast.success("User Logout")
       navigate("/")
    }

    return <div>DashBoard
            <ButtonAppBar />
        {/*<div>*/}
        {/*   <h2>Auth: {token} </h2>*/}
        {/*</div>*/}
            <DeviceContainer />
        <Button onClick={handleLogout}  variant="contained" >Logout</Button>
        </div>
};

export default DashBoard;
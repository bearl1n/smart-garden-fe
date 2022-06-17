import React, {FC, useEffect, useState} from "react";
import {Button, Paper, TextField} from "@mui/material";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hooks/redux";
import {useLoginMutation} from "../api/AuthApiSlice";
import {setUserCredentials} from "../store/reducers/AuthSlice";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [userLogin,
        {
            data: AuthResponse ,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            error: loginError
        }
    ] = useLoginMutation();
    const handleChangeEmail = (e: any) => {
        setPassword(e.target.password)
        setEmail(e.target.email)
    };

    const handleLogin = async () => {
        if (email && password){
           await userLogin({ email, password });
        } else {
            toast.error("Please fill all input field")
        }
    }

    useEffect( () => {
        if (isLoginSuccess) {
            toast.success("User login successfully")
            dispatch(
                setUserCredentials({user: AuthResponse.user, accessToken: AuthResponse.accessToken, refreshToken: AuthResponse.refreshToken, expiredDate: AuthResponse.expiredDate})
            )
            navigate("/dashboard");
        }
        }, [isLoginSuccess]

    )


    return (

        <div className={"App"}>

                    <TextField id="outlined-basic" label="Login" variant="outlined"
                        onChange={ event => setEmail(event.target.value) }
                        value={email}
                        type="text"
                        placeholder='Email'
                    /><br/>

                    <TextField id="outlined-basic" label="Password" variant="outlined"
                               onChange={ event => setPassword(event.target.value)}
                                value={password}
                                type="password"
                               placeholder='Password'
                    /><br/>

        <div className={"buttons"}>
            <span className={"log"}><Button className={"loginform"} onClick={handleLogin}  variant="contained" >Login</Button></span>
            <span className={"reg"}><Button onClick={handleLogin}  variant="contained" >Register</Button></span>
        </div>

        </div>

    )
}

export default LoginForm;
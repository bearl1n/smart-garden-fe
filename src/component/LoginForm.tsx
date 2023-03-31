import {useLoginMutation} from "../store/user/user.api";
import React, {useEffect, useState} from "react";
import {useActions} from "../hooks/actions";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "antd";

export function LoginForm() {

    const [userLogin,{isSuccess, data}] = useLoginMutation()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {setAuth, removeAuth} = useActions()
    const navigate = useNavigate();

    useEffect( () => {
            if (isSuccess) {
                console.log("is success")
                setAuth(JSON.parse(JSON.stringify(data)))
                navigate('/')
            }
        }, [isSuccess]

    )
    const handleLogin = async () => {
        if (email && password){
            await userLogin({ email, password });
        } else {
            console.log("Please fill all input field")
        }
    }

    return (
        <div className={"border-2"}>
            <p>Login</p>
            <Form className={ "py-2 w-1/5"}>
            <div>
                <input
                    type={"text"}
                    className={"border rounded-2xl py-2 px-2 w-full h-[42px] mb-2"}
                    placeholder={"email..."}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type={"text"}
                    className={"border py-2 px-2 w-full h-[42px] mb-2"}
                    placeholder={"password..."}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <div className={"buttons"}>
                   <Button className={"loginform"} onClick={handleLogin}  >Login</Button>
                </div>
            </div>
            </Form>
        </div>
    )



}
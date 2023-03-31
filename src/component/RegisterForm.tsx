import {useLoginMutation, useRegisterMutation} from "../store/user/user.api";
import React, {useEffect, useState} from "react";
import {useActions} from "../hooks/actions";
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, Switch} from "antd";
import {IUserRegisterRequest} from "../models/models";

export function RegisterForm() {

    const [userLogin,{isSuccess, data}] = useLoginMutation()
    const [userRegister, {isSuccess: isRegisterSuccess, data: regResponse}] = useRegisterMutation()
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isRegister, setIsRegister] = useState<boolean>(false)

    const {setAuth, removeAuth} = useActions()
    const navigate = useNavigate();

    useEffect(() => {
            if (isSuccess ) {
                console.log("is success")
                setAuth(JSON.parse(JSON.stringify(data)))
                navigate('/dashboard')
            }
            if ( isRegisterSuccess) {
            console.log("is success")
            setAuth(JSON.parse(JSON.stringify(regResponse)))
            navigate('/dashboard')
            }
        }, [isSuccess, isRegisterSuccess]
    )

    const handleLogin = async () => {
       if (isRegister && email && password && firstName && lastName) {
           await userRegister({ firstName: firstName , lastName: lastName , email: email, password: password} as IUserRegisterRequest);
       }
       if (!isRegister && email && password){
            await userLogin({ email, password });
       } else {
            console.log("Please fill all input field")
       }
    }

    return (
        <div className={"border-2"}>
            <Switch checkedChildren="Login" unCheckedChildren="Register" defaultChecked  onChange={e=> setIsRegister(prev => ! prev)} />
            <Form className={"justify-center py-2 w-1/5"} layout={"vertical"}>
                { isRegister &&
                <Form.Item  name={"FirstName"} label={"FirstName"}>
                    <Input type = {"text"}
                           placeholder={"Enter your name...."}
                           value={firstName}
                           onChange={e => setFirstName(e.target.value)}
                    />
                </Form.Item> }
                { isRegister &&
                    <Form.Item name={"LastName"} label={"LastName"}>
                    <Input type = {"text"}
                           placeholder={"Enter your lastName...."}
                           value={firstName}
                           onChange={e => setLastName(e.target.value)}
                    />
                </Form.Item>
                }
                <Form.Item name={"Email"} label={"Email"}>
                    <Input type = {"text"}
                           placeholder={"Enter your email...."}
                           value={firstName}
                           onChange={e => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item name={"Password"} label={"Password"}>
                    <Input.Password
                           placeholder={"Enter your password...."}
                           value={firstName}
                           onChange={e => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Button  onClick={handleLogin}>{ isRegister ? "Register" : "Login"}</Button>
            </Form>
        </div>
    )


}
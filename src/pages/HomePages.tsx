import {RegisterForm} from "../component/RegisterForm";
import {useState} from "react";
import {LoginForm} from "../component/LoginForm";

export function HomePage() {

    const [isRegisterForm, setIsRegisterForm] = useState(false)

    return (
        <div>
            <RegisterForm/>
        </div>
    )
}
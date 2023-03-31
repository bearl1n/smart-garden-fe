import React from 'react'
import {Link} from "react-router-dom";

export function Navigation() {
    return (
        <nav className={"flex justify-end items-center  h-[30px] px-3 bg-gray-900 text-white"}>
                <span><Link to={"/"} className={"mr-3"}>Home</Link> </span>
                <span><Link to={"/dashboard"}>DashBoard</Link></span>
        </nav>
    )
}
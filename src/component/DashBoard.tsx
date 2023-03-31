import {useAppSelector} from "../hooks/redux";

export function DashBoard() {
    const {token, refreshToken, user} = useAppSelector(state => state.auth)

    if (token == '') return (<p className={"text-centr"}>No items </p>)

    return (

        <div>IOT INFO</div>
    )
}
import React, { useEffect } from 'react';
import { _receiveMe, _requestMe } from '../redux/actions/MeAction';
import { sendmeRequest } from '../api/UserApi';
import Cookies from "universal-cookie"
import { useDispatch } from "react-redux";

export default function (SpecificComponent: any, path: string) {
    const cookies = new Cookies()
    const dispatch = useDispatch()
    function AuthenticationCheck(props: any) {
        useEffect(() => {
            sendmeRequest().then(response => {
                console.log("auth tsx response: ", response)
                if (!response.success && !cookies.get("X-AUTH-TOKEN")) {
                    props.history.push('/login')
                } else {
                    dispatch(_receiveMe(response))
                    console.log("in hoc said you're logged in")
                    console.log("in hoc : ", response.email, response.name, response.userImage)
                    props.history.push(path)
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}
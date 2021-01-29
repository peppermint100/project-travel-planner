import React, { useEffect } from 'react';
import { _receiveMe, _requestMe } from '../redux/actions/MeAction';
import { sendmeRequest } from '../api/UserApi';
import Cookies from "universal-cookie"
import { useDispatch } from "react-redux";
import { RouteProps } from "react-router-dom";
import env from "../configs/env";

export default function (SpecificComponent: any) {
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
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}
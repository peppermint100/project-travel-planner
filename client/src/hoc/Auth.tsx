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
                if (!response.success && !cookies.get("X-AUTH-TOKEN")) {
                    console.log('auth off')
                    props.history.push('/login')
                } else {
                    console.log('auth on')
                    dispatch(_receiveMe(response))
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}
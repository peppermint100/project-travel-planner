import React, { useEffect } from 'react';
import { _requestMe } from '../redux/actions/MeAction';
import { sendmeRequest } from '../api/UserApi';
import Cookies from "universal-cookie"

export default function (SpecificComponent: any, path: string) {
    const cookies = new Cookies()
    function AuthenticationCheck(props: any) {

        useEffect(() => {
            sendmeRequest().then(response => {
                console.log(response.success)
                //로그인 하지 않은 상태 
                if (!response.success && !cookies.get("X-AUTH-TOKEN")) {
                    props.history.push('/login')
                } else {
                    //로그인 한 상태 
                    console.log("in hoc said you're logged in")
                    console.log("in hoc : ", response.email, response.name)
                    props.history.push(path, { 
                        email: response.email,
                        name: response.name,
                    })
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}
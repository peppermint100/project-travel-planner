import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { _requestMe } from '../redux/actions/MeAction';
import { sendmeRequest } from '../api/UserApi';

export default function (SpecificComponent: any, path: string) {
    function AuthenticationCheck(props: any) {

        useEffect(() => {
            sendmeRequest().then(response => {
                console.log(response)
                //로그인 하지 않은 상태 
                if (!response.success) {
                    props.history.push('/login')
                } else {
                    //로그인 한 상태 
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
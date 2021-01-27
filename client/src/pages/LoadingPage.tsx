import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { _requestCheckConnection } from '../redux/actions/CheckConnectionAction';
import { RootReducerType } from '../redux/reducers/rootReducer';
import { useHistory } from "react-router-dom";
import dayViewImg from "./../assets/day_view.svg";
import MainLogo from '../components/Image/MainLogo';

const LoadingPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const loadingResult = useSelector((state: RootReducerType) => state.CheckConeectionReducer); 
    const redirectToLoginPage = () => {
        setTimeout(() => {
            if(!loadingResult.isLoading && loadingResult.success){
                history.push("/login");
            }
        }, 2000)
    }

    useEffect(() => {
        dispatch(_requestCheckConnection());
    }, [dispatch])

    useEffect(() => {
        redirectToLoginPage();
    }, [loadingResult])

    return (
        <div className="w-screen h-screen bg-primary flex flex-col justify-center items-center">
            <section>
                <MainLogo />
            </section>
            <section className="mt-20 mb-20">
                <img src={dayViewImg} alt="loading-image"/>
            </section>
            <section>
                <p className="text-4xl text-white font-bold tracking-widest">TRAVEL</p>
            </section>
        </div>
    )
}

export default LoadingPage

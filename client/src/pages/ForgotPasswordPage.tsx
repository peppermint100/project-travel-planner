import React from 'react';
import MainLogo from '../components/Image/MainLogo';
import * as ReactRouterDom from "react-router-dom";
import LoginForm from '../components/Form/LoginForm';
import ForgotPasswordForm from '../components/Form/ForgotPasswordForm';

const ForgotPasswordPage = () => {
    return (
        <div className="h-screen bg-backgroundGray max-w-xl mx-auto">
            {/* logo */}
            <section className="h-1/5 flex justify-center items-center"> 
                <MainLogo />
            </section>

            {/* header */}
            <section className="h-1/5 bg-red flex justify-center items-center">
                <header className="text-3xl font-bold text-primary">Reset Password</header>
            </section>

            {/* form */}
            <section className="h-2/5">
                <ForgotPasswordForm />
            </section>

            {/* navigator */}
            <section className="h-1/5 flex items-end justify-evenly">
                <span className="text-lg font-medium text-primary mb-3">
                    <ReactRouterDom.Link to={"/login"}>
                        로그인
                    </ReactRouterDom.Link>
                </span>
                <span className="text-lg font-medium text-primary mb-3">
                    <ReactRouterDom.Link to={"/signup"}>
                        회원가입
                    </ReactRouterDom.Link>
                </span>
            </section>
        </div>
    )
}

export default ForgotPasswordPage


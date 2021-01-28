
import React from 'react';
import MainLogo from '../components/Image/MainLogo';
import * as ReactRouterDom from "react-router-dom";
import LoginForm from '../components/Form/LoginForm';

const LoginPage = () => {
    return (
        <div className="h-screen bg-backgroundGray">
            {/* logo */}
            <section className="h-1/5 flex justify-center items-center"> 
                <MainLogo />
            </section>

            {/* header */}
            <section className="h-1/5 bg-red flex justify-center items-center">
                <header className="text-3xl font-bold text-primary">LOG IN</header>
            </section>

            {/* form */}
            <section className="h-2/5">
                <LoginForm />
            </section>

            {/* navigator */}
            <section className="h-1/5 flex items-end justify-evenly">
                <span className="text-lg font-medium text-primary mb-3">
                    <ReactRouterDom.Link to={"/signup"}>
                        회원가입
                    </ReactRouterDom.Link>
                </span>
                <span className="text-lg font-medium text-primary mb-3">
                    <ReactRouterDom.Link to={"/forgotpassword"}>
                        비밀번호 찾기
                    </ReactRouterDom.Link>
                </span>
            </section>
        </div>
    )
}

export default LoginPage

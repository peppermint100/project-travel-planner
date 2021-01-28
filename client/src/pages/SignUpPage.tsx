import React from 'react'
import MainLogo from '../components/Image/MainLogo'
import { Link } from "react-router-dom";
import SignUpForm from '../components/Form/SignUpForm';

const SignUpPage = () => {
    return (
        <div className="h-screen bg-backgroundGray">
            {/* logo */}
            <section className="h-1/5 flex justify-center items-center"> 
                <MainLogo />
            </section>

            {/* header */}
            <section className="h-1/5 bg-red flex justify-center items-center">
                <header className="text-3xl font-bold text-primary">SIGN UP</header>
            </section>

            {/* form */}
            <section className="h-2/5">
                <SignUpForm />
            </section>

            {/* navigator */}
            <section className="h-1/5 flex items-end justify-evenly">
                <span className="text-lg font-medium text-primary mb-3">
                    <Link to={"/login"}>
                       로그인
                    </Link>
                </span>
                <span className="text-lg font-medium text-primary mb-3">
                    <Link to={"/forgotpassword"}>
                        비밀번호 찾기
                    </Link>
                </span>
            </section>
        </div>
    )
}

export default SignUpPage
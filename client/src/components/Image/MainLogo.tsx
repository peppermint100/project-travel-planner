import React from 'react'
import logoWhite from "./../../assets/logo_white.svg";

const MainLogo = () => {
    return (
        <div className="w-max h-max flex flex-col justify-center items-center">
            <img className="w-64" src={logoWhite} alt="logo" />
        </div>
    )
}

export default MainLogo

import React from 'react'
import logoWhite from "./../../assets/logo_white.svg";
import logoPrimary from "./../../assets/logo_primary.svg";

interface Props {
    withPrimary?: boolean;
}
const MainLogo: React.FC<Props> = ({ withPrimary }) => {
    return (
        <div className="w-max h-max flex flex-col justify-center items-center">
            {
                withPrimary ? 
                <img className="w-64" src={logoPrimary} alt="logo" draggable="false" /> :
                <img className="w-64" src={logoWhite} alt="logo" draggable="false" />
            }
        </div>
    )
}

export default React.memo(MainLogo)

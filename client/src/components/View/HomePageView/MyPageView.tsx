
import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { RootReducerType } from "../../../redux/reducers/rootReducer";
import UpdateUserProfileForm from "../../Form/UpdateUserProfileForm";
import UserProfileImage from "../../Image/UserProfileImage";

const MyPageContent = () => {

    const location = useLocation();
    const meResponse = useSelector((state: RootReducerType) => state.MeReducer)

    useEffect(() => {
        console.log("mypage location: ", location.state)
        console.log("mypage meResponse: ", meResponse)
    }, [])

    return (
        <div>
            <section>
                {/* user info */}
                <div>
                    <UserProfileImage src={meResponse.userImage} />
                </div>
                <div>
                    { meResponse.name }
                </div>
                <div>
                    { meResponse.email}
                </div>
            </section>
            <section>
                {/* form */}
                <UpdateUserProfileForm user={meResponse} />
            </section>
        </div>
    )
}

export default MyPageContent

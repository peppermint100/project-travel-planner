import React from 'react'


interface Props {
    src?: string;
}

const UserProfileImage:React.FC<Props> = ({ src }) => {
    return (
            <img className="w-full h-full rounded-full object-cover" src={src} alt="user=profile-img" draggable="false"/>
    )
}

export default React.memo(UserProfileImage)

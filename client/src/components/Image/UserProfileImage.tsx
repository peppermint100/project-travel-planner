import React from 'react'

interface Props {
    src?: string;
    width?: string;
    height?: string;
}

const UserProfileImage:React.FC<Props> = ({ src, width, height }) => {
    return (
        <div style = {{width, height}}>
            <img className="w-full h-full rounded-full object-cover" src={src} alt="user=profile-img" draggable="false"/>
        </div>

    )
}

export default React.memo(UserProfileImage)

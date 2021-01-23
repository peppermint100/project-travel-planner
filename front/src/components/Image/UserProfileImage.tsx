import React from 'react'


interface Props {
    src: string;
}

const UserProfileImage:React.FC<Props> = ({ src }) => {
    return (
        <div className="w-full h-full rounded-full overflow-hidden">
            <img src={src} alt="user=profile-img" />
        </div>
    )
}

export default UserProfileImage

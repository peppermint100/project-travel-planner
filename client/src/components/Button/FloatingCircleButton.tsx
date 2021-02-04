
import { PlusOutlined } from "@ant-design/icons"
import React from 'react'

interface Props {
    onClick: () => void
}

const FloatingCircleButton: React.FC<Props> = ({ onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="
              bg-primary
                w-12 h-12
                flex justify-center items-center 
                fixed bottom-7 right-7
                rounded-full
            ">
            <PlusOutlined size={24} style={{ color: "#fff" }} />
        </button>
    )
}

export default FloatingCircleButton

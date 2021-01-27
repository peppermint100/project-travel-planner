import React from 'react'

interface Props {
    onClick?: () => void;
    text: string;
}
const DefaultButton:React.FC<Props> = ({ text, onClick }) => {
    return (
            <button 
                type="submit" 
                onClick={onClick}
                className="w-full bg-primary text-gray-200 rounded hover:bg-secondary px-4 py-2 focus:outline-none">
                { text }
            </button>
    )
}

export default DefaultButton

import React from 'react'

interface Props {
    placeholder: string;
    label?: string;
    type?: string;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    helperText?: string;
    value?: any
}

const DefaultInput: React.FC<Props> = ({ name, placeholder, label, type, onChange, helperText, value }) => {
    return (
        <div className="relative">
        { label ?  
            <label className="text-gray-600 font-light"> {label} </label>
            : null
        }
            <input type={type}
                   placeholder={placeholder} 
                   name={name}
                   onChange={onChange}
                   value={value}
                   className="w-full mt-6 mb-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-2 focus:border-primary" />           
            <pre className="absolute text-xs font-sans text-gray-500">{ helperText }</pre>
        </div>
    )
}

export default DefaultInput


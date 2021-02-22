import { Tag } from "antd"
import React from 'react'

interface Props {
    contents: Array<string>
}

const ListView: React.FC<Props> = ({ contents }) => {
    if(contents.length > 0){
        return (
            <div>
                { contents.map( content => (
                    <Tag 
                        className="mr-2 px-3 py-2 m-1 text-center align-middle text-md font-semibold rounded-lg border-none bg-gray-300"
                    >
                        { content }
                    </Tag>
                ))}
            </div>
        )
    }else{
        return null;
    }
}

export default ListView

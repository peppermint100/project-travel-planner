import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tag } from "antd"
import React from 'react'

interface Props {
    needs: Array<string>
}

const NeedsView: React.FC<Props> = ({ needs }) => {
    if(needs.length > 0){
        return (
            <div>
                { needs.map( need => (
                    <Tag 
                        className="mr-2 px-3 py-2 m-1 text-center align-middle text-md font-semibold rounded-lg border-none bg-gray-300"
                    >
                        { need }
                    </Tag>
                ))}
            </div>
        )
    }else{
        return (
            <div className="text-gray-400">
                필요한 준비물이 없습니다.
            </div>
        )
    }
}

export default NeedsView

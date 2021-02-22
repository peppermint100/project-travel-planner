import React from 'react'

interface Props {
    label: string;
    info?: any;
}

const LabeledDetailInfo: React.FC<Props> = ({ label, info }) => {
    return (
        <div className="w-full">
            <div className="w-full h-12 bg-whiteSilver text-gray-400 flex justify-start items-center">
                    <span className=" ml-6">
                        { label }
                    </span>
                </div>
                {
                    info ? 
                    <div className="w-full h-12 flex justify-start items-center">
                        <span className="ml-6">
                            { info }
                        </span>
                    </div> :
                    null
                }
        </div>
    )
}

export default LabeledDetailInfo

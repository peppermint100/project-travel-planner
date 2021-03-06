import React, { useState } from 'react'
import { Formik, Form, Field } from "formik"
import { message } from 'antd';
import { FileImageOutlined, LoadingOutlined } from '@ant-design/icons';
import DefaultInput from '../Input/DefaultInput';
import DefaultButton from '../Button/DefaultButton';
import { sendCreatePlanRequest } from '../../api/PlanApi';
import { CreatePlanResponseType } from '../../types/api/PlanType';
import { useDispatch } from 'react-redux';
import { _requestGetAllPlans } from '../../redux/actions/GetAllPlansAction';

interface Props {
    userId: number;
}

const CreatePlanForm: React.FC<Props> = ({ userId }) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    return (
        <Formik initialValues={{ imageFile: "", planName: "", fileName: ""}} onSubmit={(data) => {

            setLoading(true)
            const formData = new FormData()

            formData.append("placeImage", data.imageFile)
            formData.append("planName", data.planName)
            formData.append("userId", userId.toString())

            sendCreatePlanRequest(formData)
            .then((response: CreatePlanResponseType) => {
                if(response.succees == true){
                    message.info('새로운 계획을 추가했습니다.')
                    setLoading(false)
                }else {
                    console.log('response fail : ', response)
                    message.info(response.msg);
                    setLoading(false)
                    dispatch(_requestGetAllPlans(userId))
                }
            }) // create response of this with saga then update loading animation
        }}>
            {({ setFieldValue , isSubmitting, handleChange, values: { imageFile, fileName } }) => (
                <Form>
                    <div className="flex w-full items-center justify-center">
                        <label className="w-40 h-40 flex justify-center flex-col items-center bg-gray-200 text-blue rounded-lg tracking-wide uppercase border-2 border-dotted border-gray-300 cursor-pointer hover:bg-blue hover:text-white">
                            <span className="w-full text-gray-400 text-center break-words">
                                {
                                    imageFile ? 
                                    <p className="text-center">{fileName}</p> :
                                    <FileImageOutlined className="text-3xl"/>
                                }
                            </span>
                            <input type='file' className="hidden" name="imageFile" onChange={(e: any) => {
                                setFieldValue('imageFile', e.target.files[0])
                                setFieldValue('fileName', e.target.files[0].name)
                            }} />
                        </label>
                    </div>
                    <div className="w-56">
                        <Field as={DefaultInput} placeholder="계획이름" name="planName" />
                    </div>
                    <div className="w-56">
                        {
                            loading ? 
                                <div className="text-center">
                                    <LoadingOutlined />
                                </div> :
                            <DefaultButton text="나만의 계획 추가하기"/>
                        }
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CreatePlanForm
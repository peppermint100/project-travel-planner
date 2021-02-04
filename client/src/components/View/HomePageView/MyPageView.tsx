
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { RootReducerType } from "../../../redux/reducers/rootReducer";
import UserProfileImage from "../../Image/UserProfileImage";
import { Form, Formik, Field } from "formik";
import DefaultInput from "../../Input/DefaultInput";
import DefaultButton from "../../Button/DefaultButton";
import { MeResponse } from "../../../types/api/UserType";
import { sendUpdateUserInfoRequest } from "../../../api/UserApi";
import { BasicResponse } from "../../../types/api/BasicApiType";

interface Props {
    meResponse: MeResponse
}
const MyPageContent: React.FC<Props> = ({ meResponse }) => {
    const [updateUserInfoResponse, setUpdateUserInfoResponse] = useState<BasicResponse>({
        success: false,
        msg: ""
    }); 

    useEffect(() => {
        console.log("mypage meResponse: ", meResponse)
    }, [])
 
    return (
        <Formik
            initialValues={{ imageUrl: "", imageFile: "", name: "", passwordBefore: "", password: "", passwordConfirm: "" }}
            onSubmit={(data) => {
                console.log("update user profile data", data)
                const { imageFile, name, passwordBefore, password, passwordConfirm } = data;

                const formData = new FormData();
                
                formData.append("userImage", imageFile)

                sendUpdateUserInfoRequest({
                    userId: meResponse.userId,
                    name,
                    passwordBefore,
                    password,
                    passwordConfirm,
                    formData
                }).then((response: BasicResponse) => {
                    setUpdateUserInfoResponse(response)
                })
            }}
        >
            {({values : { imageUrl }, setFieldValue }) => (
                <Form>
                    <section className="flex flex-col items-center">
                        {/* user info */}
                        <label htmlFor="userProfileImage" className="w-40 h-40 flex justify-centerflex-col items-center tracking-wide cursor-pointer">
                            <input id="userProfileImage" type='file' className="w-40 h-40 hidden" name="imageFile" onChange={(e: React.ChangeEvent<any>) => {
                                setFieldValue('imageFile', e.target.files[0])
                                setFieldValue('imageUrl', e.target.files[0].name)
                            }} />
                            { imageUrl ?
                                <div className="w-40 h-40 flex justify-centerflex-col items-center break-words bg-gray-200 text-blue rounded-lg tracking-wide uppercase border-2 border-dotted border-gray-300 cursor-pointer hover:bg-blue hover:text-white">
                                    <div className="text-center w-40">
                                        { imageUrl }
                                    </div>
                                </div>
                                : 
                                <div className="w-full flex justify-center">
                                    <UserProfileImage src={meResponse.userImage} width="100px" height="100px" />
                                </div>
                            }
                        </label>
                        <div>
                            <span className="text-xl font-semibold text-black mt-2">
                                { meResponse.name }
                            </span>
                        </div>
                        <div>
                            <span className="text-lg text-gray-400 mt-2">
                                { meResponse.email}
                            </span>
                        </div>
                        <div className="mt-10 w-full flex flex-col items-center">
                            <div className="w-3/4">
                                <Field as={DefaultInput} placeholder="유저 이름" name="name" /> 
                            </div>
                            <div className="w-3/4">
                                <Field as={DefaultInput} placeholder="기존 비밀번호" name="passwordBefore" type="password" /> 
                            </div>
                            <div className="w-3/4">
                                <Field as={DefaultInput} placeholder="새 비밀번호" name="password" type="password"/> 
                            </div>
                            <div className="w-3/4">
                                <Field as={DefaultInput} placeholder="새 비밀번호 확인" name="passwordConfirm" type="password"/> 
                            </div>
                        </div>
                        <div>
                            {
                                updateUserInfoResponse.success && updateUserInfoResponse.msg ?
                                <p className="mt-4 text-green-400 font-semibold">{ updateUserInfoResponse.msg }</p> :
                                <p className="mt-4 text-red-400 font-semibold">{ updateUserInfoResponse.msg }</p>
                            }
                        </div>
                        <div className="w-3/4 mt-12">
                            <DefaultButton text="수정하기"/>
                        </div>
                    </section>
                </Form>
            )}
            
        </Formik>
    )
}

export default MyPageContent

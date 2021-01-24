import React from 'react'
import DefaultInput from '../Input/DefaultInput'
import { Formik, Form, Field } from "formik";
import DefaultButton from '../Button/DefaultButton';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../../redux/reducers/rootReducer';
import { _requestLogin } from '../../redux/actions/LoginAction';
import { _requestResetPassword } from '../../redux/actions/ResetPasswordAction';
import { LoadingOutlined } from '@ant-design/icons';
 
 const loginSchema = Yup.object().shape({
   email: Yup.string().email('이메일 형식이 아닙니다.').required('Required'),
   name: Yup.string()
     .required('유저이름을 입력해주세요.'),
 });
 
const ForgotPasswordForm = () => {

    const dispatch = useDispatch()
    const resetPasswordResponse = useSelector((state: RootReducerType) => state.ResetPasswordReducer);

    return (
        <Formik 
            initialValues={{ name: "", email: ""}}
            onSubmit={(data, { setSubmitting }) => {
                console.log('resetpassword data: ' , data);
                const { email, name } = data
                dispatch(_requestResetPassword({email, name}))
            }}
            validationSchema={loginSchema}
        >
            {
                ({ handleChange, isSubmitting , errors: { name, email } }) => (
                    <Form className="h-full">
                        <div className="w-2/3 mx-auto">
                            <Field name="email" type="email" placeholder="E-Mail" helperText={email} onChange={handleChange} as={DefaultInput} />
                        </div>
                        <div className="w-2/3 mx-auto">
                            <Field name="name" type="text" onChange={handleChange} helperText={name} placeholder="Username" as={DefaultInput}/>
                        </div>
                        <div className="w-2/3 mx-auto mt-8">
                            <DefaultButton text="비밀번호 초기화" />
                        </div>
                        <div className="w-2/3 mx-auto mt-8">
                            {resetPasswordResponse.success ? 
                            <p className="text-sm text-gray-500 text-center">{resetPasswordResponse.msg}</p> : 
                            <p className="text-sm text-red-500 text-center">{resetPasswordResponse.msg}</p>
                            }
                        </div>
                        <div className="w-2/3 mx-auto mt-8">
                            { isSubmitting && !resetPasswordResponse.success ? 
                            <div className="flex justify-evenly text-sm text-gray-500">
                                <LoadingOutlined />
                                <span>이메일로 임시 비밀번호를 전송중 입니다.</span>
                            </div>
                            : null}
                        </div>
                    </Form>
                )
            }

        </Formik>
    )
}

export default ForgotPasswordForm;


import React, { useEffect } from 'react'
import DefaultInput from '../Input/DefaultInput'
import { Formik, Form, Field } from "formik";
import DefaultButton from '../Button/DefaultButton';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { _requestSignUp } from '../../redux/actions/SignUpAction';
import { SignUpReqeust } from '../../types/api/UserType';
import { RootReducerType } from '../../redux/reducers/rootReducer';
import { useHistory } from 'react-router-dom';
 
const SignUpForm = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const signUpResponse = useSelector((state:RootReducerType) => state.SignUpReducer);
    
    if(signUpResponse.success){
            history.push("/login")
        }

    const signUpSchema = Yup.object().shape({
    email: Yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
    username: Yup.string().min(2, "유저이름은 2글자 이상입니다.").max(15, "너무 긴 유저 이름입니다.").required('유저 이름을 입력해주세요.'),
    password: Yup.string()
        .min(5, '비밀번호는 최소 5글자보다 길어야 합니다.')
        .max(15, '너무 긴 비밀번호입니다.')
        .required('비밀번호를 입력해주세요.'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('비밀번호 확인을 입력해주세요.'),
    });

    return (
        <Formik 
            initialValues={{ email: "", password: "", username: "", passwordConfirm: ""}}
            onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);

                const { email, password, username, passwordConfirm } = data;
                console.log('signup data: ' , data);
                const signUpRequest: SignUpReqeust = {
                    email,
                    password,
                    passwordConfirm,
                    name: username,
                }

                dispatch(_requestSignUp(signUpRequest));
                setSubmitting(false);
            }}
            validationSchema={signUpSchema}
        >
            {
                ({ handleChange, errors: { email, password, username, passwordConfirm } }) => (
                    <Form className="h-full">
                        <div className="w-2/3 mx-auto">
                            <Field name="email" type="email" placeholder="E-Mail" helperText={email} onChange={handleChange} as={DefaultInput} />
                        </div>
                        <div className="w-2/3 mx-auto">
                            <Field name="username" type="text" onChange={handleChange} helperText={username} placeholder="Username" as={DefaultInput}/>
                        </div>
                        <div className="w-2/3 mx-auto">
                            <Field name="password" type="password" onChange={handleChange} helperText={password} placeholder="Password" as={DefaultInput}/>
                        </div>
                        <div className="w-2/3 mx-auto">
                            <Field name="passwordConfirm" type="password" onChange={handleChange} helperText={passwordConfirm} placeholder="Confirm Password" as={DefaultInput}/>
                        </div>
                        <div className="w-2/3 mx-auto mt-8">
                            <DefaultButton text="회원가입" />
                        </div>
                        <div className="w-2/3 mx-auto mt-8">
                            {signUpResponse.success ? 
                                null : 
                            <p className="text-sm text-red-500">{signUpResponse.msg}</p>
                            }
                        </div>
                    </Form>
                )
            }

        </Formik>
    )
}

export default SignUpForm

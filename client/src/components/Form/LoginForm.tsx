import React, { useEffect } from 'react'
import DefaultInput from '../Input/DefaultInput'
import { Formik, Form, Field } from "formik";
import DefaultButton from '../Button/DefaultButton';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootReducerType } from '../../redux/reducers/rootReducer';
import { _requestLogin } from '../../redux/actions/LoginAction';
 
 const loginSchema = Yup.object().shape({
   email: Yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
   password: Yup.string()
     .required('비밀번호를 입력해주세요.'),
 });
 
const LoginForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const loginResponse = useSelector((state: RootReducerType) => state.LoginReducer);

    return (
        <Formik 
            initialValues={{ email: "", password: ""}}
            onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                dispatch(_requestLogin(data, () => {
                    history.push("/home")
                }));
                setSubmitting(false);
            }}
            validationSchema={loginSchema}
        >
            {
                ({ handleChange, errors: { email, password } }) => (
                    <Form className="h-full max-w-lg mx-auto">
                        <div className="w-2/3 mx-auto">
                            <Field name="email" type="email" placeholder="E-Mail" helperText={email} onChange={handleChange} as={DefaultInput} />
                        </div>
                        <div className="w-2/3 mx-auto">
                            <Field name="password" type="password" onChange={handleChange} helperText={password} placeholder="Password" as={DefaultInput}/>
                        </div>
                        <div className="w-2/3 mx-auto mt-8">
                            <DefaultButton text="로그인" />
                        </div>
                        <div className="w-2/3 mx-auto mt-8">
                            {loginResponse.success ? 
                                null : 
                            <p className="text-sm text-red-500">{loginResponse.msg}</p>
                            }
                        </div>
                    </Form>
                )
            }

        </Formik>
    )
}

export default LoginForm;

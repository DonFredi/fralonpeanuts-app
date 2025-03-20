import { useState } from "react";
import { useForm } from 'react-hook-form';
import Login from "../Login";
import { SubmitHandler } from "react-hook-form";
import { axiosPrivate } from "@/services/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";




interface FormData {
    email: string;
    password: string;
}

const LoginContainer = () => {
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState<string>('');
    const navigate = useNavigate();



    const handleLogin: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        setLoginErrorMsg('');

        try {
            const response = await axiosPrivate.post('/auth/login', { ...data },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            const result = response.data;
            console.log(result)

            if (result && result.success) {
                setLoginSuccess(true);
                setLoading(false);
                setLoginErrorMsg('');
                navigate('/');

            }
        } catch (error) {

            let errorMessage: string = "Something went wrong. Please try again.";

            if (axios.isAxiosError(error)) {

                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {

                errorMessage = error.message || errorMessage;
            }

            console.log('Error logging in:', errorMessage);
            setLoginErrorMsg(errorMessage);
            setLoading(false); // Stop loading on error
        } finally {
            setLoading(false);
        }


    }

    return (
        <>
            <Login
                handleLogin={handleLogin}
                loading={loading}
                loginSuccess={loginSuccess}
                loginErrorMsg={loginErrorMsg}
            />
        </>
    )
}

export default LoginContainer
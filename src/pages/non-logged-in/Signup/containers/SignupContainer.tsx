import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Signup from "../Signup";
import axiosPrivate from "@/services/axios";
import axios from 'axios';

interface FormData {
    username: string;
    email: string;
    phoneNumber: number;
    password: string;
    confirmPassword: string;
}

const SignupContainer = () => {
    const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [signUpErrorMsg, setSignUpErrorMsg] = useState<string>('');

    const handleSignup: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        setSignUpErrorMsg('');
        console.log('Submitting Signup data:', data);


        try {
            const response = await axiosPrivate.post('/auth/signup', { ...data },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
            console.log(response.data)
            const result = response.data;


            if (result && result.success) {
                setSignupSuccess(true);
                setLoading(false);
                setSignUpErrorMsg('');

            }
        } catch (error) {
            // Checking if it's an AxiosError
            let errorMessage: string = "Something went wrong. Please try again.";

            if (axios.isAxiosError(error)) {
                // Safe to access the AxiosError properties here
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                // Fallback if it's a regular JavaScript error
                errorMessage = error.message || errorMessage;
            }

            console.log('Error signing up:', errorMessage);
            setSignUpErrorMsg(errorMessage);
            setLoading(false); // Stop loading on error
        } finally {
            setLoading(false);
        }


    }

    return (
        <Signup
            handleSignup={handleSignup}
            loading={loading}
            signupSuccess={signupSuccess}
            signUpErrorMsg={signUpErrorMsg}
        />
    );
}

export default SignupContainer;

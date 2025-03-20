import { FC } from "react";
import { Link } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/UI-primitives/Button";


interface FormData {
    email: string;
    password: string;
}

interface LoginFormProps {
    handleLogin: SubmitHandler<FormData>;
    loading: boolean;
    loginSuccess: boolean;
    loginErrorMsg: string;
}

const LoginForm: FC<LoginFormProps> = ({ handleLogin, loading, loginSuccess, loginErrorMsg }) => {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Form data submitted:', data);
        handleLogin(data);
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input

                    type="text"
                    placeholder='Type your email...'
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email address'
                        }
                    })}
                />


                <div>
                    <label htmlFor="password">Password</label>
                    <input

                        type="password"
                        placeholder='Type your password...'
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long'
                            }
                        })}
                    />

                </div>
                <Button onClick={() => alert('Log In button clicked')}>
                    Log In
                </Button>

                <Link>Forgot password?</Link>
                <p>Don't have an account?
                    <Link to="auth/signup"> Sign Up</Link>
                </p>

                {loading && <p>Loading...</p>}
                {loginSuccess && <p>Login Successful!</p>}
                {loginErrorMsg && <p>Error: {loginErrorMsg}</p>}


            </form >
        </>
    )
}

export default LoginForm
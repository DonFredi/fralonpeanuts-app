import { FC } from 'react'
import LoginForm from "./components/LoginForm/LoginForm"


interface LoginProps {
    handleLogin: (data: any) => void;
    loading: boolean;
    loginSuccess: boolean;
    loginErrorMsg: string;
}



const Login: FC<LoginProps> = ({
    handleLogin,
    loading,
    loginSuccess,
    loginErrorMsg,
}) => {

    return (
        <div>
            <h1>Login to your Account</h1>
            <LoginForm
                handleLogin={handleLogin}
                loading={loading}
                loginSuccess={loginSuccess}
                loginErrorMsg={loginErrorMsg}
            />
        </div>
    )
}

export default Login
import React from 'react'

// Components
import Login from '../../components/organisms/Login'

const LoginPage: React.FC = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center" id="login">
            <Login />
        </div>
    )
}
export default LoginPage
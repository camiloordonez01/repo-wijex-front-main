import React from 'react'

// Components
import Login from '../components/organisms/Login'

const LoginPage: React.FC = () => {
    return (
        <div className="bg-sky-400 w-full h-screen flex justify-center items-center">
            <div className="bg-white w-96 m-auto rounded shadow-lg p-8 text-center">
                <Login />
            </div>
        </div>
    )
}
export default LoginPage
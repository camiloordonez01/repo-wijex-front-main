import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import Image from 'next/image'

// Services
import { signIn } from '../../../services/users'

// Utils
import { regexEmail } from '../../../utils/utils'

type LoginData = {
    email: string
    password: string
}

const Login: React.FC = () => {
    const [submit, setSubmit] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginData>({
        mode: 'onSubmit',
    })
    const emailValidationObj = {
        required: 'Campo requerido',
        pattern: {
            value: regexEmail,
            message: 'Correo inválido',
        },
        maxLength: {
            value: 50,
            message: 'Debe contener máximo 50 caracteres',
        },
    }
    const passwordValidationObj = {
        required: 'Campo requerido',
        minLength: {
            value: 5,
            message: 'Debe contener mínimo 5 caracteres',
        },
        maxLength: {
            value: 50,
            message: 'Debe contener máximo 50 caracteres',
        },
    }
    
    useEffect(() => {
        if(localStorage.getItem('accessToken')){
            Router.push('/panel')
        }
    }, [])

    const handleLogin = async (data: LoginData) => {
        setSubmit(true)
        try {
            const result = await signIn(data)
            if (result.status === 200) {
                const {
                    data: { result: ResultData },
                } = result

                localStorage.setItem('accessToken', ResultData.accessToken)
                localStorage.setItem('refreshToken', ResultData.refreshToken)
                localStorage.setItem('expirationDate', ResultData.expirationDate)
                localStorage.setItem('uidUser', ResultData.uidUser)

                Router.push('/panel')
            }
        } catch (error) {
            console.error(error)
            setSubmit(false)
            setError('password', {
                type: 'data error',
                message: error.response.data.message,
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <Image
                src="/images/logo.png"
                width={252}
                height={128}
            />
            <label className="grid text-left">
                <span className="text-gray-700 ml-1">Email</span>
                <input
                    type="text"
                    className={`mt-1 block w-full shadow ${(errors.email&&'border-red-500')}`}
                    name="email"
                    placeholder="Correo electrónico"
                    {...register('email', emailValidationObj)}
                    disabled={submit}
                />
                <span className="text-red-500 text-xs float-left">{errors.email?.message}</span>
            </label>
            <label className="grid text-left mt-3">
                <span className="text-gray-700 ml-1">Contraseña</span>
                <input
                    type="password"
                    className={`mt-1 block w-full shadow ${(errors.password&&'border-red-500')}`}
                    name="password"
                    placeholder="Contraseña"
                    {...register('password', passwordValidationObj)}
                    disabled={submit}
                />
                <span className="text-red-500 text-xs float-left mt-1 ">{errors.password?.message}</span>
            </label>
            <button
                type="submit"
                name="login"
                className="w-full bg-sky-400 mt-4 py-2 rounded text-white"
                disabled={submit}
            >
                Iniciar sesión
            </button>
        </form>
    )
}
export default Login

import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import Image from 'next/image'

// Services
import { signIn } from '../../../services/users'

// Utils
import { regexEmail } from '../../../utils/utils'

//style
import style from './styles.module.css'

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

                let fecha = new Date();
                fecha.setHours(fecha.getHours()+1);

                localStorage.setItem('accessToken', ResultData.accessToken)
                localStorage.setItem('refreshToken', ResultData.refreshToken)
                localStorage.setItem('expirationDate', fecha.getTime().toString())
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
        <div className={`${style.contentCard} w-96 m-auto rounded shadow-lg p-8 text-center`}>
            <form onSubmit={handleSubmit(handleLogin)}>
                <img
                    className="m-auto"
                    src="/logo-wijex-blue.png"
                    width={150}
                    height={78}
                />
                <label className="grid text-left">
                    <span className="font-bold uppercase text-xs">Email</span>
                    <input
                        type="text"
                        className={`mt-1 block w-full rounded-2xl border-none ${(errors.email&&'border-red-500')}`}
                        name="email"
                        placeholder="Correo electrónico"
                        {...register('email', emailValidationObj)}
                        disabled={submit}
                    />
                    <span className="text-red-500 text-xs float-left">{errors.email?.message}</span>
                </label>
                <label className="grid text-left mt-3">
                    <span className="font-bold uppercase text-xs">Contraseña</span>
                    <input
                        type="password"
                        className={`mt-1 block w-full rounded-2xl border-none ${(errors.password&&'border-red-500')}`}
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
                    className={`${style.btnLogin} py-3 px-8 mt-4 w-full text-white`}
                    disabled={submit}
                >
                    <div className={`items-center justify-center inline-flex pr-3 ${!submit && 'hidden'}`}>
                        <div className="w-4 h-4 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    </div>
                    Iniciar sesión
                </button>
            </form>
        </div>
    )
}
export default Login

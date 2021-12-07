import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

// Templates
import PanelTemplate from '../../../../components/templates/PanelTemplate'
import PageTemplate from '../../../../components/templates/PageTemplate'

// Services
import { createUser } from '../../../../services/users'

// Utils
import { regexEmail } from '../../../../utils/utils'

type UserData = {
    nombre: string
    apellido: string
    email: string,
    password?: string
}

const UsuarioCrearPage: React.FC = () => {
    const [uidUser, setUidUser] = useState("")
    const [submit, setSubmit] = useState(false)
    const [response, setResponse] = useState({ color: "", msg: "" })
    const router = useRouter()
    const { id } = router.query

    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue
    } = useForm<UserData>({
        mode: 'onSubmit',
    })
    const nombreValidationObj = {
        required: 'Campo requerido',
        maxLength: {
            value: 100,
            message: 'Debe contener máximo 100 caracteres',
        }
    }
    const apellidoValidationObj = {
        required: 'Campo requerido',
        maxLength: {
            value: 100,
            message: 'Debe contener máximo 100 caracteres',
        },
    }
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
        minLength: {
            value: 5,
            message: 'Debe contener mínimo 5 caracteres',
        },
        maxLength: {
            value: 50,
            message: 'Debe contener máximo 50 caracteres',
        },
    }

    const handleCreate = async (user: UserData) => {
        const { data } = await createUser(user)
        if (data.statusCode === 200) {
            setResponse({
                color: 'green-400',
                msg: 'Usuario creado exitosamente'
            })
            setTimeout(() =>{
                Router.push('/panel/usuarios')
            }, 2000);
        }else{
            setResponse({
                color: 'red-400',
                msg: 'Hubo un error al crear'
            })
        }
    }
    return (
        <PanelTemplate>
            <PageTemplate title="Crear usuario">
                {response.msg && (
                    <div className={`bg-${response.color} px-3 py-2 text-white mb-3 flex justify-between`}>
                        {response.msg}
                        <label className="font-bold cursor-pointer" onClick={() => setResponse({ color: "", msg: "" })}>X</label>
                    </div>
                )}
                <form onSubmit={handleSubmit(handleCreate)}>
                    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 bg-white shadow p-8">
                        <div className="text-center">
                            <label className="text-h4 font-bold">Nombres <span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                className={`mt-1 block w-full shadow ${(errors.nombre&&'border-red-500')}`}
                                name="nombre"
                                placeholder="Nombre completo del usuario"
                                {...register('nombre', nombreValidationObj)}
                                disabled={submit}
                            />
                            <span className="text-red-500 text-xs float-left">{errors.nombre?.message}</span>
                        </div>
                        <div className="text-center md:mt-0 mt-5">
                            <label className="text-h4 font-bold">Apellidos <span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                className={`mt-1 block w-full shadow ${(errors.apellido&&'border-red-500')}`}
                                name="apellido"
                                placeholder="Apellido completo del usuario"
                                {...register('apellido', apellidoValidationObj)}
                                disabled={submit}
                            />
                            <span className="text-red-500 text-xs float-left">{errors.apellido?.message}</span>
                        </div>
                        <div className="text-center md:mt-0 mt-5">
                            <label className="text-h4 font-bold">Email <span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                className={`mt-1 block w-full shadow bg-gray-200`}
                                name="email"
                                {...register('email', emailValidationObj)}
                                placeholder="Correo electrónico del usuario"
                                disabled={submit}
                            />
                        </div>
                        <div className="text-center md:mt-0 mt-5">
                            <label className="text-h4 font-bold">Contraseña <span className="text-red-400">*</span></label>
                            <input
                                type="password"
                                className={`mt-1 block w-full shadow ${(errors.password&&'border-red-500')}`}
                                name="password"
                                placeholder="Contraseña"
                                {...register('password', passwordValidationObj)}
                                disabled={submit}
                            />
                            <span className="text-red-500 text-xs float-left mt-1 ">{errors.password?.message}</span>
                        </div>
                        <div className="col-span-1 md:col-span-4 text-right  md:mt-0 mt-5">
                            <button
                                type="submit"
                                name="editar"
                                className="bg-green-400 py-2 px-3 rounded text-white"
                                disabled={submit}
                            >
                                Crear
                            </button>
                        </div>
                    </div>
                    
                </form>
                
            </PageTemplate>
        </PanelTemplate>
    )
}
export default UsuarioCrearPage
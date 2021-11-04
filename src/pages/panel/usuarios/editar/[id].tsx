import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

// Templates
import PanelTemplate from '../../../../components/templates/PanelTemplate'
import PageTemplate from '../../../../components/templates/PageTemplate'

// Services
import { getUserById, updateUserById } from '../../../../services/users'

// Utils
import { regexEmail } from '../../../../utils/utils'

type UserData = {
    nombre: string
    apellido: string
    email: string,
    password?: string
}

const UsuarioEditarPage: React.FC = () => {
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
    const getUser = async () => {
        const { data } = await getUserById(id)
        let user = {
            nombre: "",
            apellido: "",
            email: "",
            uidUser: ""
        }
        if (data.statusCode === 200) {
            if(data.result){
                user = data.result
            }
            setValue("nombre", user.nombre)
            setValue("apellido", user.apellido)
            setValue("email", user.email)
            setUidUser(user.uidUser)
        }
    }

    const handleEdit = async (user: UserData) => {
        let datos = user
        if(datos.password === ''){
            delete datos['password']
        }
        const { data } = await updateUserById(id, {
            uidUser,
            ...datos
        })
        if (data.statusCode === 200) {
            setResponse({
                color: 'green-400',
                msg: 'Usuario actualizado exitosamente'
            })
        }else{
            setResponse({
                color: 'red-400',
                msg: 'Hubo un error al actualizar'
            })
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <PanelTemplate>
            <PageTemplate title="Editar usuario">
                {response.msg && (
                    <div className={`bg-${response.color} px-3 py-2 text-white mb-3 flex justify-between`}>
                        {response.msg}
                        <label className="font-bold cursor-pointer" onClick={() => setResponse({ color: "", msg: "" })}>X</label>
                    </div>
                )}
                <form onSubmit={handleSubmit(handleEdit)}>
                    <div className="grid grid-cols-4 gap-4 bg-white shadow p-8">
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
                        <div className="text-center">
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
                        <div className="text-center">
                            <label className="text-h4 font-bold">Email</label>
                            <input
                                type="text"
                                className={`mt-1 block w-full shadow bg-gray-200`}
                                name="email"
                                {...register('email', emailValidationObj)}
                                placeholder="Correo electrónico del usuario"
                                disabled={true}
                            />
                        </div>
                        <div className="text-center">
                            <label className="text-h4 font-bold">Contraseña</label>
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
                        <div className="col-span-4 text-right">
                            <button
                                type="submit"
                                name="editar"
                                className="bg-sky-400 py-2 px-3 rounded text-white"
                                disabled={submit}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                    
                </form>
                
            </PageTemplate>
        </PanelTemplate>
    )
}
export default UsuarioEditarPage
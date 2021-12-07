import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useRouter } from 'next/router'

// Services
import { getUserById, deleteUserById } from '../../../../services/users'

// Templates
import PanelTemplate from '../../../../components/templates/PanelTemplate'
import PageTemplate from '../../../../components/templates/PageTemplate'

const UsuarioEliminarPage: React.FC = () => {
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        email: "",
        uidUser: ""
    })
    const [response, setResponse] = useState({ color: "", msg: "" })
    const router = useRouter()
    const { id } = router.query

    const getUser = async () => {
        const { data } = await getUserById(id)
        if (data.statusCode === 200) {
            setUser(data.result)
        }
    }
    const handleDelete = async () => {
        const { data } = await deleteUserById(id, user.uidUser)
        if (data.statusCode === 200) {
            setResponse({
                color: 'green-400',
                msg: 'Usuario eliminado exitosamente'
            })
            setTimeout(() =>{
                Router.push('/panel/usuarios')
            }, 2000);
        }else{
            setResponse({
                color: 'red-400',
                msg: 'Hubo un error al eliminar'
            })
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <PanelTemplate>
            <PageTemplate title="Eliminar usuario">
                {response.msg && (
                    <div className={`bg-${response.color} px-3 py-2 text-white mb-3 flex justify-between`}>
                        {response.msg}
                        <label className="font-bold cursor-pointer" onClick={() => setResponse({ color: "", msg: "" })}>X</label>
                    </div>
                )}
                <div className="grid col-span-1 md:grid-cols-3 md:gap-4 bg-white shadow p-8">
                    <div className=" col-span-1 md:col-span-3 text-center text-h4 justify-center md:text-h2-d">
                        ¿Estas seguro de eliminar el siguiente usuario?
                    </div>
                    <div className="text-center md:mt-0 mt-5">
                        <label className="text-h4 font-bold">Nombres</label>
                        <p className="text-h4 md:text-h3 mt-2">{user.nombre}</p>
                    </div>
                    <div className="text-center md:mt-0 mt-5">
                        <label className="text-h4 font-bold">Apellidos</label>
                        <p className="text-h4 md:text-h3 mt-2">{user.apellido}</p>
                    </div>
                    <div className="text-center md:mt-0 mt-5">
                        <label className="text-h4 font-bold">Email</label>
                        <p className="text-h4 md:text-h3 mt-2">{user.email}</p>
                    </div>
                    <div className="col-span-1 md:col-span-3 text-right md:mt-0 mt-5">
                        <button
                            type="submit"
                            name="editar"
                            className="bg-red-400 py-2 px-3 rounded text-white"
                            onClick={handleDelete}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </PageTemplate>
        </PanelTemplate>
    )
}
export default UsuarioEliminarPage

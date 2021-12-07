import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Services
import { getUserById } from '../../../../services/users'

// Templates
import PanelTemplate from '../../../../components/templates/PanelTemplate'
import PageTemplate from '../../../../components/templates/PageTemplate'

const UsuarioVerPage: React.FC = () => {
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        email: ""
    })
    const router = useRouter()
    const { id } = router.query

    const getUser = async () => {
        const { data } = await getUserById(id)
        if (data.statusCode === 200) {
            setUser(data.result)
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <PanelTemplate>
            <PageTemplate title="Ver usuario">
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 bg-white shadow p-8">
                    <div className="text-center">
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
                </div>
            </PageTemplate>
        </PanelTemplate>
    )
}
export default UsuarioVerPage

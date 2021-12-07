import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'

// Services
import { getUsers } from '../../../services/users'

// Components
import Table from '../../../components/molecules/Table'

// Templates
import PanelTemplate from '../../../components/templates/PanelTemplate'
import PageTemplate from '../../../components/templates/PageTemplate'

const UsuariosPage: React.FC = () => {
    const [users, setUsers] = useState([])
    const router = useRouter()

    const getUsersAll = async () => {
        const { data } = await getUsers()
        if (data.statusCode === 200) {
            const info = data.result.map((element, index) => {
                return {
                    id: index + 1,
                    ...element,
                }
            })
            setUsers(info)
        }
    }

    useEffect(() => {
        getUsersAll()
    }, [])
    return (
        <PanelTemplate>
            <PageTemplate title="Lista de usuarios">
                <button className="bg-green-400 rounded mr-3 py-2 px-3 text-white float-right mb-2" onClick={() => Router.push(`${router.pathname}/create/`)}>Crear</button>
                {users.length !== 0 && (
                    <Table
                        info={users}
                        editar={true}
                        eliminar={true}
                        ver={true}
                    />
                )}
            </PageTemplate>
        </PanelTemplate>
    )
}
export default UsuariosPage

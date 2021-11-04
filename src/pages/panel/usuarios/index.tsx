import React, { useEffect, useState } from 'react'

// Services
import { getUsers } from '../../../services/users'

// Components
import Table from '../../../components/molecules/Table'

// Templates
import PanelTemplate from '../../../components/templates/PanelTemplate'
import PageTemplate from '../../../components/templates/PageTemplate'

const UsuariosPage: React.FC = () => {
    const [users, setUsers] = useState([])

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

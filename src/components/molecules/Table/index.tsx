import React, {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'
import DataTable from 'react-data-table-component'

interface Props {
    info: Array<object>,
    editar?: boolean,
    eliminar?: boolean,
    ver?: boolean
}

const Table: React.FC<Props> = ({
    info,
    editar,
    eliminar,
    ver
}) => {
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])

    const router = useRouter()
    useEffect(() => {
        let cols = []
        let rows = []
        if(info.length > 0){
            for(let element in info[0]){
                cols.push({
                    name: element[0].toUpperCase() + element.slice(1),
                    selector: row => row[element],
                    sortable: true,
                })
            }
            if(editar || eliminar || ver){
                cols.push({
                    cell: (row) => {
                        return (
                            <>
                                {ver&& <button className="bg-blue-400 rounded mr-3 py-2 px-3 text-white" onClick={() => Router.push(`${router.pathname}/ver/${row.idFirebase}/`)}>Ver</button>}
                                {editar&& <button className="bg-yellow-400 rounded mr-3 py-2 px-3 text-white" onClick={() => Router.push(`${router.pathname}/editar/${row.idFirebase}/`)}>Editar</button>}
                                {eliminar&& <button className="bg-red-400 rounded mr-3 py-2 px-3 text-white" onClick={() => Router.push(`${router.pathname}/eliminar/${row.idFirebase}/`)}>Eliminar</button>}
                            </>
                        )
                    },
                    button: true,
                    minWidth: '300px'
                })
            }
        }
        setColumns(cols)
        setData(info)
    }, [])
    return (
        <DataTable
            columns={columns}
            data={data}
            fixedHeaderScrollHeight="300px"
            highlightOnHover
            pagination
            responsive
            striped
            subHeaderWrap
        />
    )
}
export default Table
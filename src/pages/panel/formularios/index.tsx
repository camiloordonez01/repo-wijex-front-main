import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'
import DataTable from 'react-data-table-component'

// Services
import { getForms } from '../../../services/form'

// Components
import Table from '../../../components/molecules/Table'
import EstadoForm from '../../../components/molecules/EstadoForm'
import ResponsableForm from '../../../components/molecules/ResponsableForm'
import ImagenesForm from '../../../components/molecules/ImagenesForm'

// Templates
import PanelTemplate from '../../../components/templates/PanelTemplate'
import PageTemplate from '../../../components/templates/PageTemplate'

const FormulariosPage: React.FC = () => {
    const [forms, setForms] = useState([])
    const [columns, setColumns] = useState([])
    const router = useRouter()
    const refTable = useRef(null)
    const refScroll = useRef(null)

    const caseInsensitiveSort = (rowA, rowB) => {
        const a = new Date(rowA.fecha)
        const b = new Date(rowB.fecha)
        
        if (a > b) {
            return 1
        }
    
        if (b > a) {
            return -1
        }
    
        return 0
    }
    const getFormsAll = async () => {
        const { data } = await getForms()
        if (data.statusCode === 200) {
            let info = []
            data.result.map((element, index) => {
                info.push({
                    ...element,
                })
            })

            
            const cols = [
                {
                    name: 'Fecha y hora de registro',
                    cell: (row) => row.fecha,
                    sortable: true,
                    reorder: true,
                    sortFunction: caseInsensitiveSort
                },
                {
                    name: 'Responsable',
                    cell: (row) => {
                        return (
                            <ResponsableForm idForm={row.idFirebase} responsable={row.responsable}/>
                        )
                    },
                    minWidth: '200px',
                },
                {
                    name: 'Estado',
                    cell: (row) => {
                        return (
                            <EstadoForm idForm={row.idFirebase} estado={row.estado}/>
                        )
                    },
                    minWidth: '200px'
                },
                {
                    name: 'Número de Template',
                    cell: (row) => row.template,
                    sortable: true,
                },
                {
                    name: 'Color de Template',
                    cell: (row) => row.themeColor1,
                    sortable: true,
                },
                {
                    name: 'Nombre',
                    cell: (row) => row.nombre,
                    sortable: true,
                },
                {
                    name: 'Apellido',
                    cell: (row) => row.apellido,
                    sortable: true,
                },
                {
                    name: 'Color del Nombre y Apellido',
                    cell: (row) => row.colorNombre,
                    sortable: true,
                },
                {
                    name: 'Cargo',
                    cell: (row) => row.cargo,
                    sortable: true,
                },
                {
                    name: 'Color del cargo',
                    cell: (row) => row.colorDescripcion,
                    sortable: true,
                },
                {
                    name: 'Nombre de la empresa',
                    cell: (row) => row.empresa,
                    sortable: true,
                },
                {
                    name: 'Color del Nombre de la Empresa',
                    cell: (row) => row.colorNombre,
                    sortable: true,
                },
                {
                    name: 'Eslogan',
                    cell: (row) => row.eslogan,
                    sortable: true,
                },
                {
                    name: 'Color del Nombre del Eslogan',
                    cell: (row) => row.colorDescripcion,
                    sortable: true,
                },
                {
                    name: 'Historia personal o profesional',
                    cell: (row) => row.historia,
                    sortable: true,
                },
                {
                    name: 'Curriculum Vitae/Catálogo u otro',
                    cell: (row) => {
                        let data = row.pdf.map((p) => {
                            return (
                                <a className="bg-green-300 rounded mr-3 py-2 px-3 text-white" href={p.url} target="_blank">{p.btnNombre}</a>
                            )
                        })
                        return data
                    },
                    grow: 3
                },
                {
                    name: 'Historia de la empresa',
                    cell: (row) => row.historia,
                    sortable: true,
                },
                {
                    name: 'Catálogo/Especificaciones de productos u otros',
                    cell: (row) => {
                        let data = row.pdf.map((p) => {
                            return (
                                <a className="bg-green-300 rounded mr-3 py-2 px-3 text-white" href={p.url} target="_blank">{p.btnNombre}</a>
                            )
                        })
                        return data
                    },
                    grow: 3
                },
                {
                    name: 'Foto de portada',
                    cell: (row) => {
                        return (
                            <>
                                <img src={row.fotoPortada} width={100} />
                            </>
                        )
                    },
                    minWidth: '100px'
                },
                {
                    name: 'Fotos de perfil',
                    cell: (row) => {
                        return (
                            <>
                                <img src={row.fotosPerfil[0]} width={100} />
                                <img src={row.fotosPerfil[1]} width={100} />
                            </>
                        )
                    },
                    minWidth: '200px'
                },
                {
                    name: 'Fotos de galeria',
                    cell: (row) => {
                        return (
                            <>
                                <img src={row.fotosGaleria[0]} width={100} />
                                <img src={row.fotosGaleria[1]} width={100} />
                                <img src={row.fotosGaleria[2]} width={100} />
                            </>
                        )
                    },
                    minWidth: '300px'
                },
                {
                    name: 'Imagenes',
                    cell: (row) => {
                        return (
                            <ImagenesForm idForm={row.idFirebase} imagen={row.imagenes}/>
                        )
                    },
                    minWidth: '200px'
                },
                {
                    name: 'Telefono',
                    cell: (row) => row.telefono,
                    sortable: true,
                },
                {
                    name: 'Email',
                    cell: (row) => row.email,
                    sortable: true,
                },
                {
                    name: 'Pais',
                    cell: (row) => row.pais,
                    sortable: true,
                },
                {
                    name: 'Provincia',
                    cell: (row) => row.provincia,
                    sortable: true,
                },
                {
                    name: 'Localidad',
                    cell: (row) => row.localidad,
                    sortable: true,
                },
                {
                    name: 'Dirección',
                    cell: (row) => row.direccion,
                    sortable: true,
                },
                {
                    name: 'Número',
                    cell: (row) => row.calle,
                    sortable: true,
                },
                {
                    name: 'Latitud',
                    cell: (row) => row.latitud,
                    sortable: true,
                },
                {
                    name: 'Longitud',
                    cell: (row) => row.longitud,
                    sortable: true,
                },
                {
                    name: 'Facebook',
                    cell: (row) => row.facebook,
                    sortable: true,
                },
                {
                    name: 'Twitter',
                    cell: (row) => row.twitter,
                    sortable: true,
                },
                {
                    name: 'Instagram',
                    cell: (row) => row.instagram,
                    sortable: true,
                },
                {
                    name: 'Linkedin',
                    cell: (row) => row.linkedin,
                    sortable: true,
                },
                {
                    name: 'Wijex',
                    cell: (row) => row.wijex,
                    sortable: true,
                },
                {
                    name: 'Youtube',
                    cell: (row) => row.youtube,
                    sortable: true,
                },
                {
                    name: 'Tiktok',
                    cell: (row) => row.tiktok,
                    sortable: true,
                },
                {
                    name: 'Telegram',
                    cell: (row) => row.telegram,
                    sortable: true,
                },
            ]
            setForms(info)
            setColumns(cols)
        }
    }

    const setScroll1 = (e) => {
        const table = document.getElementsByClassName('sc-dlVxhl eSVLyH')[0]
        table.scrollLeft = e.target.scrollLeft
    }

    useEffect(() => {
        getFormsAll()
    }, [])
    return (
        <PanelTemplate>
            <PageTemplate title="Lista de formularios">
                {forms.length !== 0 && (
                    <>
                        <div ref={refScroll} onScroll={(e) => setScroll1(e)} style={{height: '20px', overflowX: 'scroll', overflowY: 'hidden'}}>
                            <div style={{width: '5560px', height: '20px'}}></div>
                        </div>
                        <DataTable
                            columns={columns}
                            data={forms}
                            fixedHeaderScrollHeight="300px"
                            highlightOnHover
                            pagination
                            responsive
                            striped
                            subHeaderWrap
                            defaultSortAsc={false}
                            keyField={'tabla'}
                        />
                    </>
                )}
            </PageTemplate>
        </PanelTemplate>
    )
}
export default FormulariosPage

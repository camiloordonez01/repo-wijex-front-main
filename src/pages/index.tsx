import React, { useEffect } from 'react'
import Router from 'next/router'

const IndexPage: React.FC = () => {
    useEffect(() => {
        Router.push('/formulario')
    }, [])

    return <h1>Pagina principal</h1>
}
export default IndexPage

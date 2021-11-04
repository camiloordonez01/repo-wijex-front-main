import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import moment from 'moment-timezone'

import Menu from '../../organisms/Menu'
import Header from '../../organisms/Header'
import Footer from '../../organisms/Footer'

const { TIMEZONE } = process.env

const IndexPanelPage: React.FC = ({
    children
}) => {
    useEffect(() => {
        if(!localStorage.getItem('accessToken')){
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('expirationDate')

            Router.push('/login')
        }

        let expiration = localStorage.getItem('expirationDate')
        if(!expiration){
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('expirationDate') 
            Router.push('/login')
        }
        
        const dateNow =  moment().tz('America/Bogota').toDate()
        const dateCurrent = moment(expiration, 'YYYY-MM-DD HH:mm:ss.SSS').tz('America/Bogota').toDate()
        
        if(dateNow > dateCurrent){
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('expirationDate')

            Router.push('/login')
        }
    })

    return (
        <div className="h-screen bg-gray-100">
            <div className="grid grid-cols-7 w-full h-full">
                <div className="col-span-1 bg-sky-600 overflow-auto">
                    <Menu />
                </div>
                <div className="col-span-6 bg-red overflow-auto">
                    <Header />
                    <div className="px-8 py-6">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
export default IndexPanelPage
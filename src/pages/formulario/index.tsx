import React from 'react'
import Image from 'next/image'

// Components
import FormWebCard from '../../components/organisms/FormWebCard'

const FormularioPage: React.FC = () => {
    return (
        <div className="antialiased text-gray-900 px-6" id="formulario">
            <div className="md:pt-6 md:pl-6 pt-6">
                <img
                    className="m-auto md:m-0"
                    src="/logo-wijex.png"
                    width={150}
                    height={70}
                />
            </div>
            <div className="max-w-xl mx-auto py-6 md:py-12 divide-y md:max-w-4xl">
                <FormWebCard />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:pb-6 md:pl-6 m-auto md:m-0">
                    <img
                        src="/logo-wijex.png"
                        width={150}
                        height={70}
                    />
                </div>
                <div className="block md:relative md:text-right text-center">
                    <p className="text-white md:absolute md:bottom-0 md:right-0 md:pb-10 md:pr-6 pb-6 text-xs">Creado por Wijex ©2021 Todos los derechos reservados</p>
                </div>
            </div>
        </div>
    )
}
export default FormularioPage

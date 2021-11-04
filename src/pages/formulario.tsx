import React from 'react'
import Image from 'next/image'

// Components
import FormWebCard from '../components/organisms/FormWebCard'

const FormularioPage: React.FC = () => {
    return (
        <div className="antialiased text-gray-900 px-6" id="formulario">
            <div className="pt-6 pl-6">
                <Image
                    src="/logo-wijex.png"
                    width={150}
                    height={70}
                />
            </div>
            <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
                <FormWebCard />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="pb-6 pl-6">
                    <Image
                        src="/logo-wijex.png"
                        width={150}
                        height={70}
                    />
                </div>
                <div className="relative text-right ">
                    <p className="text-white absolute bottom-0 right-0 pb-10 pr-6 text-xs">Creado por Wijex ©2021 Todos los derechos reservados</p>
                </div>
            </div>
        </div>
    )
}
export default FormularioPage

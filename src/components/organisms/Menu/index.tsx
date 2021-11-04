import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

const Menu: React.FC = () => {
    const router = useRouter()
    return (
        <>
            <div className="py-3 px-2 border-b flex justify-center items-center border-gray-400">
                <Image
                    className="rounded-full bg-white shadow"
                    src="/images/icono.png"
                    width={33}
                    height={33}
                />
                <span className="text-h6 pl-3 text-white">Wijex App</span>
            </div>
            <ul className="whitespace-nowrap relative flex-col flex p-2 mb-0 list-none mt-0">
                <li className="mb-0">
                    <Link href="/panel">
                        <div
                            className={`cursor-pointer relative whitespace-nowrap mb-1 text-white rounded py-2 px-4 w-full block hover:bg-sky-700 bg-opacity-25 ${
                                router.pathname === '/panel' && 'bg-sky-200'
                            }`}
                        >
                            <FontAwesomeIcon
                                className="text-h6 text-center mr-2"
                                icon={faTachometerAlt}
                            />
                            <p className="inline m-0 whitespace-normal">
                                Dashboard
                            </p>
                        </div>
                    </Link>
                </li>
                <li className="mb-0">
                    <Link href="/panel/usuarios">
                        <div
                            className={`cursor-pointer relative whitespace-nowrap mb-1 text-white rounded py-2 px-4 w-full block hover:bg-sky-700 bg-opacity-25 ${
                                router.pathname.includes('usuarios') && 'bg-sky-200'
                            }`}
                        >
                            <FontAwesomeIcon
                                className="text-h6 text-center mr-2"
                                icon={faUsers}
                            />
                            <p className="inline m-0 whitespace-normal">
                            Usuarios
                            </p>
                        </div>
                    </Link>
                </li>
            </ul>
        </>
    )
}
export default Menu

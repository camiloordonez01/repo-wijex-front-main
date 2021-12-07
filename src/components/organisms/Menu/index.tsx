import React, {useState} from 'react'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faUserAlt, faSignOutAlt, faBars, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './styles.module.css'

const Menu: React.FC = () => {
    const [menuMobile, setMenuMobile] = useState('hidden md:block')
    const [menuState , setMenuState] = useState(0)
    const router = useRouter()
    const signOut = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('expirationDate') 
        localStorage.removeItem('uidUser') 
        Router.push('/login')
    }
    return (
        <>
            <div className="py-3 px-2 border-b flex justify-center items-center border-inputcolor">
                <img
                    className="rounded-full bg-white shadow"
                    src="/images/icono.png"
                    width={33}
                    height={33}
                />
                <span className="text-h6 pl-3 text-white">Wijex App</span>
            </div>
            <div className="block md:hidden py-3 px-5 text-right">
                <FontAwesomeIcon
                    className={`${styles.icon} text-h6 text-center mr-2 text-white`}
                    icon={faBars}
                    onClick={() => {
                        console.log(menuState)
                        if(menuState){
                            setMenuMobile('hidden md:block')
                            setMenuState(0)
                        }else{
                            setMenuMobile('block')
                            setMenuState(1)
                        }
                    }}
                />
            </div>
            <ul className={`${menuMobile} transition whitespace-nowrap relative flex-col flex p-2 mb-0 list-none mt-0 md:border-none border-t border-inputcolor`}>
                <li className="mb-0">
                    <Link href="/panel">
                        <div
                            className={`cursor-pointer relative whitespace-nowrap mb-1 text-white rounded py-2 px-4 w-full block hover:bg-sky-700 bg-opacity-25 ${
                                router.pathname === '/panel' && 'bg-sky-200'
                            }`}
                        >
                            <FontAwesomeIcon
                                className={`${styles.icon} text-h6 text-center mr-2`}
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
                                className={`${styles.icon} text-h6 text-center mr-2`}
                                icon={faUserAlt}
                            />
                            <p className="inline m-0 whitespace-normal">
                            Usuarios
                            </p>
                        </div>
                    </Link>
                </li>
                <li className="mb-0">
                    <Link href="/panel/formularios">
                        <div
                            className={`cursor-pointer relative whitespace-nowrap mb-1 text-white rounded py-2 px-4 w-full block hover:bg-sky-700 bg-opacity-25 ${
                                router.pathname.includes('formularios') && 'bg-sky-200'
                            }`}
                        >
                            <FontAwesomeIcon
                                className={`${styles.icon} text-h6 text-center mr-2`}
                                icon={faAddressBook}
                            />
                            <p className="inline m-0 whitespace-normal">
                            Formularios
                            </p>
                        </div>
                    </Link>
                </li>
            </ul>
            <div className={`${menuMobile} p-2 block md:absolute md:bottom-0 w-full`}>
                <div
                    className={`cursor-pointer relative whitespace-nowrap mb-1 text-white rounded py-2 px-4 w-full block hover:bg-sky-700 bg-opacity-25`}
                    onClick={signOut}
                >
                    <FontAwesomeIcon
                        className={`${styles.icon} text-h6 text-center mr-2`}
                        icon={faSignOutAlt}
                    />
                    <p className="inline m-0 whitespace-normal">
                        Cerrar sesión
                    </p>
                </div>
            </div>
        </>
    )
}
export default Menu

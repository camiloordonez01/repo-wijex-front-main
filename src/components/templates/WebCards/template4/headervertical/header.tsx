import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { QRCode } from "react-qr-svg";

export default function HeaderNavVertical(props: any) {
    const router = useRouter();
    const [active, setActive] = useState(true);
    const [showModal, setShowModal] = useState(false);
    let menuArray = [true, false, false];
    const [menu, setMenu] = useState(menuArray);
    const [show, setShow] = useState(false);

    const setMenuValue = (props: any) => {
        let newArr = [...menu];
        newArr[props] = !newArr[props];
        setMenu(newArr);
    }

    const handleClick = () => {
        setActive(!active);
    };
    useEffect(() => {
        // window is accessible here.
        console.log("window.innerHeight", window.innerHeight);
    }, []);
    return (
        <div >
            <div className="rounded-r lg:hidden flex justify-between w-full p-6 items-center bg-t5primary shadow mb-1 h-auto">
                <div className="flex justify-between  items-center space-x-3">
                    <Link href={'https://www.wijex.com'}>
                        <img src="/logo-wijex-blue.png"
                            width={93.75} height={43.5}
                            
                            alt="logo-wijex"
                        />
                    </Link>
                </div>
                <div aria-label="toggler" className="flex justify-center items-center">
                    <button aria-label="open" id="open" onClick={() => setShow(true)} className={`${show ? 'hidden' : ''} focus:outline-none focus:ring-2`}>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20" stroke="#2B484E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12H20" stroke="#2B484E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 18H20" stroke="#2B484E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button aria-label="close" id="close" onClick={() => setShow(false)} className={`${show ? '' : 'hidden'} focus:outline-none focus:ring-2 text-t5t5fourth`}>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#2B484E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="#2B484E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="Main" className={`${show ? '' : '-translate-x-full'} transform lg:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start h-full  w-full base:w-64 flex-col`}>
                <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
                    <Link href={'https://www.wijex.com'}>
                        <img src="/logo-wijex-blue.png"
                            width={93.75} height={43.5}
                            
                            alt="logo-wijex"
                        />
                    </Link>
                </div>
                <div className={`${!show ? 'hidden' : ''} mt-8 flex flex-col space-x-3 lg:block lg:-translate-x-full`}>
                    <div className="mb-4 lg:mb-12 pl-3">
                        <a
                            href={`${router.basePath}`}
                            style={{color: props.color}}
                            className="text-base font-bold leading-none tracking-tighter text-t5fourth title-font uppercase mx-3 cursor-pointer ">
                            INICIO
                        </a>
                    </div>
                    <div className="mb-4 lg:mb-12">
                        <a
                            href={`${router.basePath}#informationprofile`}
                            style={{color: props.color}}
                            className="text-base font-bold leading-none tracking-tighter text-t5fourth title-font uppercase mx-3 cursor-pointer ">
                            SOBRE MÍ
                        </a>
                    </div>
                    <div className="mb-4 lg:mb-12">
                        <a
                            href={`${router.basePath}#galleryprofile`}
                            style={{color: props.color}}
                            className="text-base font-bold leading-none tracking-tighter text-t5fourth title-font uppercase mx-3 cursor-pointer "
                        >
                            Galería
                        </a>
                    </div>
                    <div className="mb-4 lg:mb-12">
                        <a
                            href={`${router.basePath}#contactprofile`}
                            style={{color: props.color}}
                            className="text-base font-bold leading-none tracking-tighter text-t5fourth title-font uppercase mx-3 cursor-pointer "
                        >
                            CONTACTO
                        </a>
                    </div>
                    <div className="mb-4 lg:mb-12">
                        <text
                            onClick={() => { setActive(false); setShowModal(true); setShow(false) }}
                            style={{color: props.color}}
                            className="text-base font-bold leading-none tracking-tighter text-t5fourth title-font uppercase mx-3 cursor-pointer "
                        >
                            COMPARTIR
                        </text>
                    </div>

                </div>

            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-t5primary dark:bg-t5primary outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-xl font-semibold">
                                        Mi Webcard
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="Q"
                                        style={{ width: 256 }}
                                        value={window.location.href}
                                    />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    );
};
export { HeaderNavVertical }
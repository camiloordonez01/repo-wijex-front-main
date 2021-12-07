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
    const [show, setShow] = useState(true);

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
            <div className="rounded-r lg:hidden flex justify-between w-full p-6 items-center bg-third2 h-auto">
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
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 18H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button aria-label="close" id="close" onClick={() => setShow(false)} className={`${show ? '' : 'hidden'} focus:outline-none focus:ring-2`}>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="Main" className={`${show ? 'translate-x-0' : '-translate-x-full'} transform  lg:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 flex-col`}>
                <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
                    <Link href={'https://www.wijex.com'}>
                        <img src="/logo-wijex-blue.png"
                            width={93.75} height={43.5}
                            
                            alt="logo-wijex"
                        />
                    </Link>
                </div>
                <div className="mt-8 flex flex-col bg-white space-x-3">
                    <div className="mb-4 pl-3">
                        <a
                            href={`${router.basePath}`}
                            style={{color: props.color}}
                            className="text-sm leading-none tracking-tighter  title-font uppercase mx-3 cursor-pointer hover:text-third">
                            INICIO
                        </a>
                    </div>
                    <div className="mb-4">
                        <a
                            href={`${router.basePath}#informationprofile`}
                            style={{color: props.color}}
                            className="text-sm leading-none tracking-tighter  title-font uppercase mx-3 cursor-pointer ">
                            SOBRE MÍ
                        </a>
                    </div>
                    <div className="mb-4">
                        <a
                            href={`${router.basePath}#galleryprofile`}
                            style={{color: props.color}}
                            className="text-sm leading-none tracking-tighter  title-font uppercase mx-3 cursor-pointer "
                        >
                            Galería
                        </a>
                    </div>
                    <div className="mb-4">
                        <a
                            href={`${router.basePath}#contactprofile`}
                            style={{color: props.color}}
                            className="text-sm leading-none tracking-tighter  title-font uppercase mx-3 cursor-pointer "
                        >
                            CONTACTO
                        </a>
                    </div>
                    <div className="mb-4">
                        <text
                            onClick={() => { setActive(false); setShowModal(true) }}
                            style={{color: props.color}}
                            className="text-sm leading-none tracking-tighter  title-font uppercase mx-3 cursor-pointer "
                        >
                            COMPARTIR
                        </text>
                    </div>
                </div>

            </div>
        </div>
    );
};
export { HeaderNavVertical }
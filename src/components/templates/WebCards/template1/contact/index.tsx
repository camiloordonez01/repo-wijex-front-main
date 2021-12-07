import { useRouter } from 'next/router';
import Image from "next/image";
import React from 'react';

// Components
import GoogleMap from '../../../../molecules/map'

type ContactProps = {
    name: string;
    email: string;
    phone: string;
    address: string;
    number: string;
    locality: string;
    province: string;
    country: string;
    avatar: string;
    url: string;
    color: string;
    latitud: string;
    longitud: string;
};


const ContactProfile = (props: ContactProps) => {
    const router = useRouter();
    const [showModal, setShowModal] = React.useState<boolean>(false);

    const onOpenModal = () => {
        //setShowModal(true);
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <section>
            <div className="sm:flex sm:flex-row pt-10 mx-0 justify-center md:mb-8">
                <div className="lg:flex flex-col self-center sm:max-w-5xl xl:max-w-2xl z-10">
                    <div className="mx-auto flex items-center justify-center flex-col">
                        <img
                            src={`${router.basePath + props.avatar}`}
                            width={200}
                            height={200}
                            
                            alt="logo-wijex"
                            className="h-48 w-48 object-cover rounded-full"

                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="mx-auto md:pl-10">
                        <div className="flex-col flex  self-center p-10">
                            <div className="flex items-center justify-center lg:items-start lg:justify-center flex-col">
                                <h1 className="mb-3 text-h2-d font-bold leading-none tracking-wide uppercase text-blackcolor title-font lg:text-h4">
                                    {props.name}
                                </h1>
                            </div>
                            <div className="grid grid-flow-row gap-4 mt-4" style={{ display: 'inline-block', justifyContent: 'start', alignContent: 'start' }}>

                                <a href={`tel:${props.phone}`} target="_blank" rel="noopener noreferrer">
                                    <div className="flex items-center mb-3">
                                        <div className="w-11 h-11 inline-flex items-center justify-center rounded-full flex-shrink-0">
                                            <img
                                                src={`${router.basePath}/assert/icons/phoneblue.svg`}
                                                width={35}
                                                height={35}
                                                style={{fill: props.color}}
                                                alt="logo-linkedin"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <h3 className="text-black title-font text-h6 lg:text-lg ml-2 mt-1">
                                            {props.phone}
                                        </h3>
                                    </div>
                                </a>

                                <a href={`mailto:${props.email}`} target="_blank" rel="noopener noreferrer">
                                    <div className="flex items-center mb-3" >
                                        <div className="w-11 h-11 inline-flex items-center justify-center rounded-full flex-shrink-0">
                                            <img
                                                src={`${router.basePath}/assert/icons/emailblue.svg`}
                                                width={35}
                                                height={35}
                                                alt="logo-linkedin"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <h3 className="text-black title-font text-h6 lg:text-lg ml-2 mt-1">
                                            {props.email}
                                        </h3>
                                    </div>
                                </a>
                                <a href={`${props.url}/map`} target="_blank" rel="noopener noreferrer">
                                    <div className="flex items-center mb-3 cursor-pointer" onClick={() => onOpenModal()}>
                                        <div className="w-11 h-11 inline-flex items-center justify-center rounded-full flex-shrink-0">
                                            <img
                                                src={`${router.basePath}/assert/icons/direccionblue.svg`}
                                                width={35}
                                                height={35}
                                                alt="logo-linkedin"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <h3 className="text-black title-font text-h6 lg:text-lg ml-2 mt-1">
                                            {props.address} {props.number} - {props.locality} - {props.province} - {props.country}
                                        </h3>
                                    </div>
                                </a>
                                <a href={`https://api.whatsapp.com/send?phone=${props.phone}`} target="_blank" rel="noopener noreferrer">
                                    <div className="flex items-center mb-3">
                                        <div className="w-11 h-11 inline-flex items-center justify-center rounded-full flex-shrink-0">
                                            <img
                                                src={`${router.basePath}/assert/icons/whatsapp-color.png`}
                                                width={35}
                                                height={35}
                                                alt="logo-linkedin"
                                                className="rounded-full"

                                            />
                                        </div>
                                        <h3 className="text-black title-font text-h6 lg:text-lg ml-2 mt-1">
                                            {props.phone}
                                        </h3>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GoogleMap latitud={props.latitud} longitud={props.longitud} zoom={16} disabled={true}/>
        </section >
    );
}
export { ContactProfile };
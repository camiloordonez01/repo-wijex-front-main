import React from "react";
import emailjs from "emailjs-com";
import { useRouter } from "next/router";

// Components
import GoogleMap from '../../../../molecules/map'

type FormContactProps = {
    name: string;
    email: string;
    background: string;
    phone: string;
    address: string;
    number: string;
    locality: string;
    province: string;
    country: string;
    avatar: string;
    url: string;
    linkedin: string;
    youtube: string;
    twitter: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    telegram: string;
    wijex: string;
    color: string;
    latitud: string;
    longitud: string;
};

const FormContact = (props: FormContactProps) => {
    const router = useRouter();
    const [name, setName] = React.useState<string>(props.name);
    const [email, setEmail] = React.useState<string>(props.email);
    const [subject, setSubject] = React.useState<string>('');
    const [userName, setUserName] = React.useState<string>('');
    const [userEmail, setUserEmail] = React.useState<string>('');
    const [userPhone, setUserPhone] = React.useState<string>('');
    const [userMessage, setUserMessage] = React.useState<string>('');
    const [showModal, setShowModal] = React.useState<boolean>(false);

    const sendEmail = (e: any) => {
        e.preventDefault();
        let template_params: any = {
            'name': name,
            'email': email,
            'userName': userName,
            'subject': subject,
            'userEmail': userEmail,
            'userPhone': userPhone,
            'userMessage': userMessage
        }
        console.log(template_params);
        if (isFormValid()) {
            emailjs.sendForm(
                'service_jdjxzak',
                'template_pco13tx',
                e.target,
                'user_F01lHHR9vneIUbIRTcwx6').then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                });
            restInput();
        } else {
            console.log('Datos Incorrectos')
        }

    }
    const isFormValid = () => {
        return (
            userName !== '' &&
            subject !== '' &&
            userEmail !== '' &&
            userPhone !== '' &&
            userMessage !== ''
        )
    }

    const restInput = () => {
        setUserName('');
        setUserEmail('');
        setSubject('');
        setUserPhone('');
        setUserMessage('');
    }

    const onOpenModal = () => {
        //setShowModal(true);
    }

    const onCloseModal = () => {
        setShowModal(false)
    }
    return (
        <section id='contactprofile'>
            <div
                style={{backgroundColor: props.color}}
                className='filter lg:mb-20'
            >
                <div className='lg:flex lg:flex-row'>
                    <div className='lg:w-1/2 '>
                        <div className="sm:flex sm:flex-row mx-0 md:mb-8">
                            <div className="lg:flex flex-col z-10">
                                <div className="mx-auto flex items-center lg:items-start justify-center flex-col pt-10">
                                    <img
                                        src={`${router.basePath + props.avatar}`}
                                        alt="logo-wijex"
                                        className="object-cover 10/12"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row pb-5 pt-5 justify-items-start px-2">
                            <div className="mx-auto justify-start item-start">
                                <div className="flex flex-col self-start">

                                    <div className="grid grid-flow-col gap-4">
                                        {
                                            props.facebook !== '' &&
                                            <a href={props.facebook} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/facebook.png`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.twitter !== '' &&
                                            <a href={props.twitter} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/twitter.png`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.instagram !== '' &&
                                            <a href={props.instagram} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/instagram.png`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.linkedin !== '' &&
                                            <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/linkedin.png`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.wijex !== '' &&
                                            <a href={props.wijex} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/wijex.png`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.youtube !== '' &&
                                            <a href={props.youtube} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/youtube.png`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.tiktok !== '' &&
                                            <a href={props.tiktok} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/tik-tok.png`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.telegram !== '' &&
                                            <a href={`https://t.me/${props.telegram}`} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/telegram-color.png`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </a>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/2 lg:pt-20'>
                        <div className="lg:container px-10 py-6 mx-auto">
                            <div>
                                <form onSubmit={sendEmail} className='z-20 opacity-100'>
                                    <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2 md:grid-cols-2">
                                        <div hidden>
                                            <input
                                                id="name"
                                                name='name'
                                                type="text"
                                                value={name}
                                                onChange={(value: any) => setName(value.currentTarget.value)}
                                                className="block w-full  px-4 py-2 mt-2 text-labelcolor bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-white dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                        </div>
                                        <div hidden>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={(value: any) => setEmail(value.currentTarget.value)}
                                                className="block w-full px-4 py-2 mt-2 text-labelcolor bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-white dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                        </div>
                                        <div>
                                            <label htmlFor="userName" className="pl-4 text-labelcolor dark:text-secondary">Nombre</label>
                                            <input
                                                id="username"
                                                name='userName'
                                                type="text"
                                                value={userName}
                                                onChange={(value: any) => setUserName(value.currentTarget.value)}
                                                className="block w-full  px-4 py-2 mt-2 text-white bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-white dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                        </div>
                                        <div>
                                            <label className="pl-4 text-labelcolor dark:text-secondary">Asunto</label>
                                            <input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                value={subject}
                                                onChange={(value: any) => setSubject(value.currentTarget.value)}
                                                className="block w-full px-4 py-2 mt-2 text-labelcolor bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-white dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                        </div>
                                        <div>
                                            <label className="pl-4 text-labelcolor dark:text-secondary" >E-mail</label>
                                            <input
                                                id="userEmail"
                                                name="userEmail"
                                                type="email"
                                                value={userEmail}
                                                onChange={(value: any) => setUserEmail(value.currentTarget.value)}
                                                className="block w-full px-4 py-2 mt-2 text-labelcolor bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-white dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                        </div>
                                        <div>
                                            <label className="pl-4 text-labelcolor dark:text-secondary">Teléfono</label>
                                            <input
                                                id="userPhone"
                                                name="userPhone"
                                                type="text"
                                                value={userPhone}
                                                onChange={(value: any) => setUserPhone(value.currentTarget.value)}
                                                className="block w-full px-4 py-2 mt-2 text-white bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-white dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-8 mt-4">
                                        <div className="relative mb-4">
                                            <label className="pl-4 text-labelcolor dark:text-secondary">Dejá tu consulta</label>
                                            <textarea
                                                id="userMessage"
                                                name="userMessage"
                                                value={userMessage}
                                                onChange={(value: any) => setUserMessage(value.currentTarget.value)}
                                                className="block w-full px-4 py-2 mt-2 text-white bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-white dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring duration-200 ease-in-out"></textarea>
                                        </div>
                                    </div>
                                    <div className="flex justify-center lg:justify-end mt-6">
                                        <button
                                            type='submit'
                                            className="px-12 py-6 pt-4 leading-5 transition-colors duration-200 transform bg-primary rounded-md hover:bg-primary focus:outline-none focus:bg-primary shadow-lg" style={{ color: 'white' }}>
                                            <h1 className="mx-auto text-xl font-semibold leading-none tracking-tighter text-whitecolor title-font">
                                                ENVIAR
                                            </h1>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GoogleMap latitud={props.latitud} longitud={props.longitud} zoom={16} disabled={true}/>
        </section >
    );
};

export default FormContact;
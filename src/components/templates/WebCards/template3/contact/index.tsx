import { useRouter } from 'next/router';
import emailjs from "emailjs-com";
import React from 'react';

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
    information: string;
    pdf: Array<object>;
    imgInformation: string;
    color: string;
};


const ContactProfile = (props: ContactProps) => {
    const router = useRouter();
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>(props.name);
    const [email, setEmail] = React.useState<string>(props.email);
    const [subject, setSubject] = React.useState<string>('');
    const [userName, setUserName] = React.useState<string>('');
    const [userEmail, setUserEmail] = React.useState<string>('');
    const [userPhone, setUserPhone] = React.useState<string>('');
    const [userMessage, setUserMessage] = React.useState<string>('');

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

    const onResumeClick = () => {
        const PDF = `${router.basePath + props.pdf}`
        window.open(PDF);
    }

    return (
        <section>
            <div className='lg:flex lg:flex-row '>
                <div style={{backgroundColor: props.color}} className='lg:w-2/3 bg-opacity-25 mt-10 mb-32 flex flex-col justify-center'>
                    <div className="p-10 sm:max-w-6xl xl:max-w-3xl z-10 item-end content-end justify-end">
                        <p className="text-justify text-white title-font font-bold lg:text-xl">
                            {props.information}
                        </p>

                    </div>
                </div>
                <div style={{backgroundColor: props.color}} className='lg:w-1/2 bg-opacity-25  mt-10 mb-32 flex flex-col justify-center'>
                    <div className="pt-6 pl-6">
                    {props.pdf.map((data) => (
                        <button onClick={() => onResumeClick()}
                            className="mt-2 w-full px-8 py-12 bg-black z-1 leading-5 transition-colors duration-200 transform  rounded-md  focus:outline-none  shadow-lg"
                        >
                            <h2 className="mx-auto justify text-base font-semibold leading-none tracking-wide text-white title-font">
                                {data.text}
                            </h2>
                        </button>
                    ))}
                    </div>
                    <div className="flex flex-col">
                        <div className="px-6">
                            <div className="flex flex-col w-3/4 ">
                                <div className="grid grid grid-cols-4 gap-4 mt-4">
                                    <a href={`tel:${props.phone}`} target="_blank" rel="noopener noreferrer">
                                        <div className="flex items-center mb-3">
                                            <div className="inline-flex items-center justify-center rounded-full flex-shrink-0">
                                                <img
                                                    src={`${router.basePath}/assert/icons/phone2.svg`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </a>
                                    <a href={`mailto:${props.email}`} target="_blank" rel="noopener noreferrer">
                                        <div className="flex items-center mb-3" >
                                            <div className="inline-flex items-center justify-center rounded-full flex-shrink-0">
                                                <img
                                                    src={`${router.basePath}/assert/icons/email2.svg`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </a>
                                    <a href={`${props.url}/map`} target="_blank" rel="noopener noreferrer">
                                        <div className="flex items-center mb-3 cursor-pointer" onClick={() => onOpenModal()}>
                                            <div className="inline-flex items-center justify-center rounded-full flex-shrink-0">
                                                <img
                                                    src={`${router.basePath}/assert/icons/direction2.svg`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </a>
                                    <a href={`https://api.whatsapp.com/send?phone=${props.phone}`} target="_blank" rel="noopener noreferrer">
                                        <div className="flex items-center mb-3">
                                            <div className="inline-flex items-center justify-center rounded-full flex-shrink-0">
                                                <img
                                                    src={`${router.basePath}/assert/icons/whatsapp-color.png`}
                                                    alt="logo-linkedin"
                                                    className="h-11 w-11 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='lg:w-1/2 '>
                    <div className="">
                        <img
                            src={`${router.basePath + props.imgInformation}`}
                            alt="logo-wijex"
                        />
                    </div>
                </div>

            </div>

        </section >
    );
}
export { ContactProfile };
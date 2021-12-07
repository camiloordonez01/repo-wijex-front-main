import React from "react";
import emailjs from "emailjs-com";

type FormContactProps = {
    name: string;
    email: string;
    color: string;
};

const FormContact = (props: FormContactProps) => {
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
    return (
        <section className="lg:container px-10 py-6 mx-auto" >
            <form onSubmit={sendEmail}>
                <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2 md:grid-cols-4">
                    <div hidden>
                        <input
                            id="name"
                            name='name'
                            type="text"
                            value={name}
                            onChange={(value: any) => setName(value.currentTarget.value)}
                            className="block w-full  px-4 py-2 mt-2 text-labelcolor bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-primary dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div hidden>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(value: any) => setEmail(value.currentTarget.value)}
                            className="block w-full px-4 py-2 mt-2 text-labelcolor bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-primary dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label htmlFor="userName" className="pl-4 text-labelcolor dark:text-secondary">Nombre</label>
                        <input
                            id="username"
                            name='userName'
                            type="text"
                            value={userName}
                            onChange={(value: any) => setUserName(value.currentTarget.value)}
                            className="block w-full  px-4 py-2 mt-2 text-primary bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-primary dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="pl-4 text-labelcolor dark:text-secondary">Asunto</label>
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            value={subject}
                            onChange={(value: any) => setSubject(value.currentTarget.value)}
                            className="block w-full px-4 py-2 mt-2 text-labelcolor bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-primary dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="pl-4 text-labelcolor dark:text-secondary" >E-mail</label>
                        <input
                            id="userEmail"
                            name="userEmail"
                            type="email"
                            value={userEmail}
                            onChange={(value: any) => setUserEmail(value.currentTarget.value)}
                            className="block w-full px-4 py-2 mt-2 text-labelcolor bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-primary dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="pl-4 text-labelcolor dark:text-secondary">Teléfono</label>
                        <input
                            id="userPhone"
                            name="userPhone"
                            type="text"
                            value={userPhone}
                            onChange={(value: any) => setUserPhone(value.currentTarget.value)}
                            className="block w-full px-4 py-2 mt-2 text-primary bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-primary dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
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
                            className="block w-full px-4 py-2 mt-2 text-primary bg-inputcolor border border-inputcolor rounded-md dark:bg-inputcolor dark:text-primary dark:border-inputcolor focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring duration-200 ease-in-out"></textarea>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        type='submit'
                        style={{backgroundColor: props.color, color: 'white'}}
                        className="px-8 py-3 pt-4 leading-5 transition-colors duration-200 transform  rounded-md  focus:outline-none  shadow-lg">
                        <h1 className="mx-auto text-base font-semibold leading-none tracking-tighter text-whitecolor title-font">
                            ENVIAR
                        </h1>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default FormContact;
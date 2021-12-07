import { useRouter } from 'next/router';
import emailjs from "emailjs-com";
import React from 'react';

type ContactProps = {
    name: string;
    information: string;
    pdf: string;
    imgInformation: string;
    linkedin: string;
    youtube: string;
    twitter: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    telegram: string;
    wijex: string;
};


const ContactProfile = (props: ContactProps) => {
    const router = useRouter();


    const onResumeClick = () => {
        const PDF = `${router.basePath + props.pdf}`
        window.open(PDF);
    }

    return (
        <section>
            <div className='lg:flex lg:flex-row mb-20'>
                <div className='lg:w-1/2 bg-background mt-10 flex flex-col justify-center'>
                    <div className="">
                        <img
                            src={`${router.basePath + props.imgInformation}`}
                            alt="logo-wijex"
                        />
                    </div>

                </div>
                <div className='lg:w-1/2 flex flex-col justify-between lg:pt-12'>
                    <div>
                        <div className="sm:max-w-6xl xl:max-w-3xl z-10">
                            <p className="text-justify text-t5text title-font font-bold lg:text-xl px-10 pt-12 lg-pt-0">
                                {props.information}
                            </p>
                        </div>
                        <div className="pt-6 px-10">
                            <button onClick={() => onResumeClick()}
                                className="w-auto px-4 py-4 leading-5 transition-colors duration-200 transform bg-t5secondary rounded-md hover:bg-t5secondary focus:outline-none focus:bg-t5secondary  shadow-lg"
                                style={{ color: 'white' }}
                            >
                                <h2 className="mx-auto justify text-base font-semibold leading-none tracking-wide text-primary title-font">
                                    VER CURRICULUM
                                </h2>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="px-10">
                            <div className="mt-2 pr-6">
                                <div className="flex flex-col">
                                    <div className="grid grid-flow-col gap-4 mt-10">
                                        {
                                            props.facebook !== '' &&
                                            <a href={props.facebook} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/facebook.png`}
                                                    alt="logo-linkedin"
                                                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.twitter !== '' &&
                                            <a href={props.twitter} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/twitter.png`}
                                                    alt="logo-linkedin"
                                                    className=" h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.instagram !== '' &&
                                            <a href={props.instagram} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/instagram.png`}
                                                    alt="logo-linkedin"
                                                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.linkedin !== '' &&
                                            <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/linkedin.png`}
                                                    alt="logo-linkedin"
                                                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.wijex !== '' &&
                                            <a href={props.wijex} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/wijex.png`}
                                                    alt="logo-linkedin"
                                                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.youtube !== '' &&
                                            <a href={props.youtube} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/youtube.png`}
                                                    alt="logo-linkedin"
                                                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.tiktok !== '' &&
                                            <a href={props.tiktok} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/tik-tok.png`}
                                                    alt="logo-linkedin"
                                                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.telegram !== '' &&
                                            <a href={`https://t.me/${props.telegram}`} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/telegram.png`}
                                                    alt="logo-linkedin"
                                                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                                                />
                                            </a>
                                        }
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>

        </section >
    );
}
export { ContactProfile };
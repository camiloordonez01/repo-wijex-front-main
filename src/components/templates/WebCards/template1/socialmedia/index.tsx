import { useRouter } from 'next/router';
import Image from "next/image";

type SocialMediaProps = {
    name: string;
    linkedin: string;
    youtube: string;
    twitter: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    telegram: string;
    wijex: string;
};

const SocialMedia = (props: SocialMediaProps) => {
    const router = useRouter();
    return (
        <section id='contactprofile'>
            <div className="mx-auto w-100 mt-5 mb-10">
                <div className="flex items-center justify-center lg:justify-center flex-col">
                    <h1 className="mb-3 text-h4 font-bold leading-none tracking-wide uppercase text-blackcolor title-font lg:text-2xl">
                        {props.name}
                    </h1>
                    <div className="grid grid-flow-col gap-4 mt-5">
                        {
                            props.facebook !== '' &&
                            <a href={props.facebook} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/facebook-color.png`}
                                    width={40}
                                    height={40}
                                    
                                    alt="logo-linkedin"
                                    className="rounded-full"
                                />
                            </a>
                        }
                        {
                            props.twitter !== '' &&
                            <a href={props.twitter} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/twitter-color.png`}
                                    width={40}
                                    height={40}
                                    
                                    alt="logo-linkedin"
                                    className="rounded-full"
                                />
                            </a>
                        }
                        {
                            props.instagram !== '' &&
                            <a href={props.instagram} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/instagram-color.png`}
                                    width={40}
                                    height={40}
                                    
                                    alt="logo-linkedin"
                                    className="rounded-full"
                                />
                            </a>
                        }
                        {
                            props.linkedin !== '' &&
                            <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/linkedin-color.png`}
                                    width={40}
                                    height={40}
                                    
                                    alt="logo-linkedin"
                                    className="rounded-full"
                                />
                            </a>
                        }
                        {
                            props.wijex !== '' &&
                            <a href={props.wijex} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/wijex.svg`}
                                    width={40}
                                    height={40}
                                    
                                    alt="logo-linkedin"
                                    className="rounded-full"
                                />
                            </a>
                        }
                        {
                            props.youtube !== '' &&
                            <a href={props.youtube} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/youtube-color.png`}
                                    width={40}
                                    height={40}
                                    
                                    alt="logo-linkedin"
                                    className="rounded-full"
                                />
                            </a>
                        }


                        {
                            props.tiktok !== '' &&
                            <a href={props.tiktok} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/tik-tok-color.png`}
                                    width={40}
                                    height={40}
                                    
                                    alt="logo-linkedin"
                                    className="rounded-full"
                                />
                            </a>
                        }

                        {
                            props.telegram !== '' &&
                            <a href={`https://t.me/${props.telegram}`} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/telegram-color.png`}
                                    width={40}
                                    height={40}
                                    
                                    alt="logo-linkedin"
                                    className="rounded-full"
                                />
                            </a>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}
export { SocialMedia };
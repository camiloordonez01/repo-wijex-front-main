import { useRouter } from 'next/router';

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
            <div className="mt-2 mb-10 px-6">
                <div className="flex items-center justify-center lg:justify-center flex-col">                    
                    <div className="grid grid-flow-col gap-4 mt-5">
                        {
                            props.facebook !== '' &&
                            <a href={props.facebook} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/facebook.svg`}
                                    alt="logo-linkedin"
                                    className="h-12 w-12 rounded-full"
                                />
                            </a>
                        }
                        {
                            props.twitter !== '' &&
                            <a href={props.twitter} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/twitter.svg`}
                                    alt="logo-linkedin"
                                    className="h-12 w-12 rounded-full"
                                />
                            </a>
                        }
                        {
                            props.instagram !== '' &&
                            <a href={props.instagram} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/instagram.svg`}
                                    alt="logo-linkedin"
                                    className="h-12 w-12 rounded-full"
                                />
                            </a>
                        }
                        {
                            props.linkedin !== '' &&
                            <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/linkedin.svg`}
                                    alt="logo-linkedin"
                                    className="h-12 w-12 rounded-full"
                                />
                            </a>
                        }
                        {
                            props.wijex !== '' &&
                            <a href={props.wijex} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/wijex.svg`}
                                    alt="logo-linkedin"
                                    className="h-12 w-12 rounded-full"
                                />
                            </a>
                        }
                        {
                            props.youtube !== '' &&
                            <a href={props.youtube} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/youtube.svg`}
                                    alt="logo-linkedin"
                                    className="h-12 w-12 rounded-full"
                                />
                            </a>
                        }
                        {
                            props.tiktok !== '' &&
                            <a href={props.tiktok} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/tik-tok.png`}
                                    alt="logo-linkedin"
                                    className="h-12 w-12 rounded-full"
                                />
                            </a>
                        }
                        {
                            props.telegram !== '' &&
                            <a href={`https://t.me/${props.telegram}`} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${router.basePath}/assert/icons/telegram-color.png`}
                                    alt="logo-linkedin"
                                    className="h-12 w-12 rounded-full"
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
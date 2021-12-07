import { useRouter } from 'next/router';

type InformationProps = {
    name: string;
    information: string;
    pdf: Array<object>;
    imgInformation: string;
    linkedin: string;
    youtube: string;
    twitter: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    telegram: string;
    wijex: string;
    color: string;
};

const InformationProfile = (props: InformationProps) => {
    const router = useRouter();


    const onResumeClick = () => {
        const PDF = `${router.basePath + props.pdf}`
        window.open(PDF);
    }

    return (
        <section id='informationprofile'>
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
                            <p style={{color: props.color}} className="text-justify title-font font-bold lg:text-h5 px-10 pt-12 lg-pt-0">
                                {props.information}
                            </p>
                        </div>
                        <div className="pt-6 px-10">
                        {props.pdf.map((data) => (
                            <button onClick={() => onResumeClick()}
                                style={{backgroundColor: props.color, color: 'white'}}
                                className="w-auto px-4 py-4 leading-5 transition-colors duration-200 transform  rounded-md  focus:outline-none   shadow-lg"
                            >
                                <h2 className="mx-auto justify text-base font-semibold leading-none tracking-wide text-white title-font">
                                    {data.text}
                                </h2>
                            </button>
                        ))}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="px-10">
                            <div className="mt-2">
                                <div className="flex flex-col">
                                    <div className="grid grid-flow-col gap-2 mt-10 lg:pr-32">
                                        {
                                            props.facebook !== '' &&
                                            <a href={props.facebook} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/facebook.png`}
                                                    alt="logo-linkedin"
                                                    width={45}
                                                    height={45}
                                                    className="rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.twitter !== '' &&
                                            <a href={props.twitter} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/twitter.png`}
                                                    alt="logo-linkedin"
                                                    width={45}
                                                    height={45}
                                                    className="rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.instagram !== '' &&
                                            <a href={props.instagram} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/instagram.png`}
                                                    alt="logo-linkedin"
                                                    width={45}
                                                    height={45}
                                                    className="rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.linkedin !== '' &&
                                            <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/linkedin.png`}
                                                    alt="logo-linkedin"
                                                    width={45}
                                                    height={45}
                                                    className="rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.wijex !== '' &&
                                            <a href={props.wijex} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/wijex.png`}
                                                    alt="logo-linkedin"
                                                    width={45}
                                                    height={45}
                                                    className="rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.youtube !== '' &&
                                            <a href={props.youtube} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/youtube.png`}
                                                    alt="logo-linkedin"
                                                    width={45}
                                                    height={45}
                                                    className="rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.tiktok !== '' &&
                                            <a href={props.tiktok} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/tik-tok.png`}
                                                    alt="logo-linkedin"
                                                    width={45}
                                                    height={45}
                                                    className="rounded-full"
                                                />
                                            </a>
                                        }
                                        {
                                            props.telegram !== '' &&
                                            <a href={`https://t.me/${props.telegram}`} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${router.basePath}/assert/icons/telegram-color.png`}
                                                    alt="logo-linkedin"
                                                    width={45}
                                                    height={45}
                                                    className="rounded-full"
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
export { InformationProfile };
import { useRouter } from 'next/router';
import Image from "next/image";

type BannerProps = {
    name: string;
    description: string;
    pdf: string;
    imgInformation: string;
};

const InformationProfile = (props: BannerProps) => {
    const router = useRouter();

    const onResumeClick = () => {
        const PDF = `${router.basePath + props.pdf}`
        window.open(PDF);
    }
    return (
        <section >
            <div className="flex flex-row justify-center">
                <div className="w-1/2 md:w-1/4 ">
                    <img
                        src={`${router.basePath + props.imgInformation}`}
                        alt="logo-wijex"
                    />
                </div>
                <div className="flex z-10 ml-10">
                    <div className="mx-auto pl-10 w-96">
                        <div className="flex-col flex  self-center p-10 sm:max-w-6xl xl:max-w-3xl z-10">
                            
                            <p className="text-justify text-darkgray title-font font-bold">
                                {props.description}
                            </p>
                            <div className="pt-6">
                                <button onClick={() => onResumeClick()}
                                    className="px-8 py-2 pt-3 leading-5 transition-colors duration-200 transform bg-secondary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary  shadow-lg"
                                    style={{ color: 'white' }}
                                >
                                    <h2 className="mx-auto justify text-base font-semibold leading-none tracking-wide text-primary title-font">
                                        VER CURRICULUM
                                    </h2>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export { InformationProfile };
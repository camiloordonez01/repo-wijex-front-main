import { useRouter } from 'next/router';
import Image from "next/image";

type BannerProps = {
    name: string;
    description: string;
    pdf: Array<object>;
    imgInformation: string;
};

const InformationProfile = (props: BannerProps) => {
    const router = useRouter();

    const onResumeClick = (url) => {
        const PDF = `${router.basePath + url}`
        window.open(PDF);
    }
    return (
        <section id='informationprofile'>
            <div className="sm:flex sm:flex-row mx-0 justify-center">
                <div className="hidden lg:flex flex-col self-center sm:max-w-5xl xl:max-w-2xl  z-10">
                    <div className="self-start hidden lg:flex flex-col  text-white">
                        <img
                            src={`${router.basePath + props.imgInformation}`}
                            width={450}
                            height={270}
                            
                            alt="logo-wijex"
                            className="h-56 w-56 object-cover"
                        />
                    </div>
                </div>
                <div className="flex  z-10">
                    <div className="mx-auto md:pl-10 w-100 ">
                        <div className="flex-col flex  self-center p-10 sm:max-w-6xl xl:max-w-3xl z-10">
                            <h1 className="mb-3 text-darkgray text-xs font-bold leading-none tracking-tighter uppercase title-font md:text-h1-d lg:text-5xl">
                                {props.name}
                            </h1>
                            <p className="text-justify text-darkgray title-font font-bold">
                                {props.description}
                            </p>
                            <div className="pt-6">
                                {props.pdf.map((data) => (
                                    <button
                                        className="mr-3 px-8 py-2 pt-3 leading-5 transition-colors duration-200 transform bg-fifth rounded-md hover:bg-darkgray focus:outline-none focus:bg-fifth  shadow-lg"
                                        style={{ color: 'white' }}
                                    >
                                        <h2 className="mx-auto justify text-base font-semibold leading-none tracking-wide text-whitecolor title-font">
                                            {data.text}
                                        </h2>
                                    </button>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export { InformationProfile };
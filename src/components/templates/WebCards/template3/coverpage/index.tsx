import React from 'react';
import { useRouter } from 'next/router';

type CoverPageProps = {
  name: string;
  colorName: string;
  description: string;
  colorDescription: string;
  coverPageUrl: string;
  information: string;
  pdf: string;
  imgInformation: string;
  cargo: string;
  color: string;
};

const CoverPage = (props: CoverPageProps) => {
  const router = useRouter();


  return (
    <section id='informationprofile'>
      <div className="flex flex-row w-full pt-5">
        <div className="flex flex-wrap w-1/3 lg:w-1/2 content-end justify-end ">
          <div style={{backgroundColor: props.color}} className="relative w-full opacity-25">
            <div className="flex flex-row z-20 item-end content-end justify-end">
              <div className='flex flex-col lg:w-3/2 py-6 px-2 lg:py-8 lg:px-14' >
                <h1
                  className="font-bold uppercase title-font text-h5 sm:text-d3-m  lg:text-d2-d"
                  style={{ color: props.colorName }}
                >
                  {props.name}
                </h1>
                <p
                  className="leading-none tracking-tighter uppercase text-xs sm:text-base  lg:text-h2-d"
                  style={{ color: props.colorDescription }}
                >
                  {props.cargo}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col w-2/3 lg:w-1/2">
          <img
            src={`${router.basePath + props.coverPageUrl}`}
            alt="CoverPage/png"
          />

        </div>
      </div>
      <div style={{backgroundColor: props.color}} className='flex flex-row h-20 mb-10  mx-10 lg:mb-20  lg:mr-20 lg:ml-36' />
    </section>
  );
}
export { CoverPage };
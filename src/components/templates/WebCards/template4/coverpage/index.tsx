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
  background: string;
  color: string;
};

const CoverPage = (props: CoverPageProps) => {
  const router = useRouter();


  return (
    <section >
      <div
        style={{ backgroundImage: `url(${router.basePath + props.background})`, backgroundSize: 'cover' }}
        className=' bg-center bg-no-repeat bg-t5secondary2 bg-opacity-50'
      >
        <div style={{backgroundColor: props.color}} className=" bg-opacity-50">
          <div className="flex flex-row w-full pt-10">
            <div className="flex flex-wrap w-1/2 lg:w-2/3 content-center justify-center ">
              <div className="relative bg-white w-full pt-12 pb-8">
                <div className="flex flex-row z-20 item-center content-center justify-center">
                  <div className='flex flex-col lg:w-3/2 ' >
                    <h1
                      className="font-bold uppercase title-font text-h5 sm:text-h1-d lg:text-d2-d"
                      style={{ color: props.colorName }}
                    >
                      {props.name}
                    </h1>
                    <p
                      className="leading-none tracking-tighter uppercase text-link sm:text-xs  lg:text-h2-d"
                      style={{ color: props.colorDescription }}
                    >
                      {props.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col w-1/2 lg:w-1/4 lg:mb-12">
              <img
                src={`${router.basePath + props.coverPageUrl}`}
                alt="CoverPage/png"
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export { CoverPage };


import React from 'react';
import { useRouter } from 'next/router';

type CoverPageProps = {
  name: string;
  colorName: string;
  description: string;
  colorDescription: string;
  coverPageUrl: string;
  information: string;
  pdf: Array<object>;
  imgInformation: string;
  color: string;
};

const CoverPage = (props: CoverPageProps) => {
  const router = useRouter();
  const [lineClamp, setLineClamp] = React.useState<string>('line-clamp-3');
  const [readMore, setReadMore] = React.useState<boolean>(true);

  const onResumeClick = () => {
    const PDF = `${router.basePath + props.pdf}`
    window.open(PDF);
  }

  const onClickReadMore = () => {
    setLineClamp('');
    setReadMore(false);
  }

  const onClickSeeLess = () => {
    setLineClamp('line-clamp-3');
    setReadMore(true)
  }

  return (
    <section id='informationprofile'>
      <div className="flex flex-row w-full justify-end pt-10 mb-10">
        <div className="flex flex-col w-1/2 justify-between">
          <div className="relative">
            <div className="flex flex-row justify-center  mt-10 lg:mt-20 bg-thirdy z-20">
              <div style={{backgroundColor: props.color}} className='w-full py-5 px-5 z-20'>
                <h1
                  className="text-h4 sm:text-h4 font-bold uppercase title-font lg:text-h1-d"
                  style={{ color: props.colorName }}
                >
                  {props.name}
                </h1>
                <p
                  className="leading-none tracking-tighter uppercase text-xs"
                  style={{ color: props.colorDescription }}
                >
                  {props.description}
                </p>
              </div>
            </div>
          </div>
          <div className="px-5">
            <img
              src={`${router.basePath + props.imgInformation}`}
              alt="logo-wijex"
            />
          </div>
        </div>
        <div className="flex-col w-1/2">
          <img
            src={`${router.basePath + props.coverPageUrl}`}
            alt="CoverPage/png"
          />
          <div>
            <div className="pt-5 pr-3 bg-white">
              <p className={`text-justify text-btncolor title-font font-bold text-xs ${lineClamp}`}>
                {props.information}
              </p>
              {
                readMore ?
                  <div className="cursor-pointer" onClick={onClickReadMore}>
                    <p className="text-linkcolor title-font font-bold text-xs ">
                      Leer más
                    </p>
                  </div> :
                  <div className="cursor-pointer" onClick={onClickSeeLess}>
                    <p className="text-linkcolor title-font font-bold text-xs ">
                      Ver menos
                    </p>
                  </div>
              }

              <div className="pt-5">
              {props.pdf.map((data) => (
                <button onClick={() => onResumeClick()}
                  className="px-8 py-2 pt-2 leading-5 transition-colors duration-200 transform bg-thirdy rounded-md hover:bg-thirdy focus:outline-none focus:bg-thirdy  shadow-lg"
                  style={{ color: 'white', backgroundColor: props.color }}
                >
                  <h2 className="text-xs font-semibold leading-none tracking-wide text-white title-font">
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
export { CoverPage };
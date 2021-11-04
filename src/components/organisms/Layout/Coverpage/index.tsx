import { useRouter } from 'next/router';

type CoverPageProps = {
  name: string;
  colorName: string;
  description: string;
  colorDescription: string;
  coverPageUrl: string;
};

const CoverPage = (props: CoverPageProps) => {
  const router = useRouter();
  return (
    <section>
      <div className="absolute">
        <div className="mx-auto ml-5 mt-5 md:pl-10 md:mt-12 lg:ml-12 lg:pl-12 lg:pt-12" >
          <div className="self-start lg:flex flex-col">
            <h1
              className="mb-3 text-base font-bold leading-none tracking-tighter uppercase title-font md:text-3xl lg:text-5xl"
              style={{ color: props.colorName }}
            >
              {props.name}
            </h1>
          </div>
          <div className="w-1/2 flex flex-col items-start">
            <div className="self-start lg:flex flex-col">
              <p
                className="leading-none tracking-tighter text-sm md:text-xl uppercase"
                style={{ color: props.colorDescription }}
              >
                {props.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <img
        src={`${router.basePath + props.coverPageUrl}`}
        alt="CoverPage/png"
      />
    </section>
  );
}
export { CoverPage };
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
      <div className="relative overflow-hidden">
        <img
          src={`${router.basePath + props.coverPageUrl}`}
          alt="CoverPage/png"
        />
        <div className="absolute w-full bottom-10 left-10 lg:bottom-48 inset-x-0 leading-4">
          <div className="self-start lg:flex flex-col">
            <h1
              className="mb-3 text-xs font-bold leading-none tracking-tighter uppercase title-font md:text-h1-d lg:text-5xl "
              style={{ color: props.colorName }}
            >
              {props.name}
            </h1>
          </div>
          <div className="w-1/2 flex flex-col items-start">
            <div className="self-start lg:flex flex-col">
              <p
                className="leading-none tracking-tighter text-h5 md:text-xl uppercase"
                style={{ color: props.colorDescription }}
              >
                {props.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export { CoverPage };
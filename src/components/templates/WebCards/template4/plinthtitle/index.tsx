type PlinthTitleProps = {
  title: string;
  color: string;
};

const PlinthTitle = (props: PlinthTitleProps) => {
  return (
    <section id='galleryprofile'>
      <div className="py-4 flex center items-center bg-t5primary">
        <h1 style={{color: props.color}} className="mx-auto text-lg font-semibold leading-none tracking-wide lg:text-lg title-font">
          {props.title}
        </h1>
      </div>
    </section>
  );
}

export { PlinthTitle };
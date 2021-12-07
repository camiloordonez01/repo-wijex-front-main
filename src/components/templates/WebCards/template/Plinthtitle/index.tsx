type PlinthTitleProps = {
  title: string;
};

const PlinthTitle = (props: PlinthTitleProps) => {
  return (
    <section id='galleryprofile'>
      <div className="py-4 flex center items-center bg-primary">
        <h1 className="mx-auto text-l font-semibold leading-none tracking-wide text-whitecolor lg:text-xl title-font">
          {props.title}
        </h1>
      </div>
    </section>
  );
}

export { PlinthTitle };
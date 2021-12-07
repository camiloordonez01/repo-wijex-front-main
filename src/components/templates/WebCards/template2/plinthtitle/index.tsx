type PlinthTitleProps = {
  title: string;
  color: string;
};

const PlinthTitle = (props: PlinthTitleProps) => {
  return (
    <section id='galleryprofile'>
      <div style={{backgroundColor: props.color}} className="py-4 flex center items-center">
        <h1 className="mx-auto text-lg font-semibold leading-none tracking-wide text-whitecolor lg:text-lg title-font">
          {props.title}
        </h1>
      </div>
    </section>
  );
}

export { PlinthTitle };
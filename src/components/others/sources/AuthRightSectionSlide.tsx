interface AuthRightSectionSlideProps {
  bgImage: string;
  image: string;
  title: JSX.Element | string;
  description: JSX.Element | string;
}
export function AuthRightSectionSlideContent({
  bgImage,
  image,
  description,
  title,
}: AuthRightSectionSlideProps) {
  return (
    <>
      <div className="dots-shape absolute top-0 left-0">
        <img src="/assets/static/dots-shape.svg" alt="" />
      </div>
      <img className="w-full h-full p-0" src={bgImage} />
      <div
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0, 73, 224, 0.00) 32.87%, #0049E0 100%)",
        }}
        className="absolute top-0 content w-full h-full flex flex-col justify-center items-center"
      >
        <img className="relative z-10 w-[60%]" src={image} alt="" />
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-extrabold text-white leading-tight">{title}</h1>
          <p className="text-sm text-white font-normal leading-5">{description}</p>
        </div>
      </div>
    </>
  );
}

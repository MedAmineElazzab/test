import { Footer } from "@/components";

export function StepsLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="relative  h-screen w-full overflow-hidden  flex items-center justify-between ">
      <div className="h-full w-full overflow-y-auto">
        <div className="sticky top-[0] z-10 w-full h-[96px] p-8 bg-[white] border-b-[1px] border-solid border-[#EAECF0]  flex justify-center items-center ">
          <img src="/assets/LogoMeducateLayout.svg" alt="" />
        </div>

        <div
          style={{
            backgroundImage: "url(/assets/bg.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "calc(100vh - 192px)",
          }}
          className="w-full relative py-24 px-8  flex justify-center"
        >
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

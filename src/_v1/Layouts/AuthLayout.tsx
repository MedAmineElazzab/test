import Slider from "@/_v1/components/slider";
import Link from "next/link";

export default function AuthLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="relative overflow-hidden bg-[#f8F8F8]  login h-screen w-screen flex justify-between flex-row-reverse ">
      <div className="relative left-section overflow-hidden w-[45%] w1100:hidden w1300:w-[35%] bg-primary-normal h-full px-[30px]">
        <img
          src="/dots.svg"
          alt=""
          className="absolute top-0 left-[91%] w-[6vw] "
        />
        <Link href="/auth">
          <div className="logo-section w-[200px] w1300:w-[170px] bg-white px-[10px] mt-[30px] rounded-full  flex justify-center items-center py-2 ">
            <img src="/assets/logo.svg" alt="" />
          </div>
        </Link>

        <div className="text-area mt-[100px] w1300:mt-[60px] flex flex-col gap-[20px]">
          <h1 className="text-[50px] w1300:text-[40px] font-semibold leading-[50px] text-white font-SourceSans">
            Start your learning <br /> journey with us!
          </h1>
          <p className="text-white  font-SourceSans text-[18px] w1300:text-[16px] w-[90%] text-opacity-75 ">
            To initiate the account creation process, we kindly request that you
            provide us with some essential information.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full ">
          <Slider/>
        </div>

        <img
          src="/dots.svg"
          alt=""
          className="absolute bottom-[-6vw] w1300:bottom-[-4vw] -left-[-30px] w-[20vw] w1300:w-[15vw] rotate-180 "
        />
      </div>
      <div className="right-section w-[55%] w1300:w-[65%] w1100:w-[100%] w1100:bg-primary-normal ">
        {children}
      </div>
    </div>
  );
}

import RegisterForm from "@/_v1/components/forms/RegisterForm";
export default function Register() {
  return (
    <div className="h-full flex justify-center  py-[30px] tall:items-start w-phone:items-start w-phone:overflow-auto tall:overflow-auto overflow-y-auto items-start ">
      <div className="flex justify-center items-center flex-col w1300:px-[15px] tall:px-[20px] tall:w-fit w1100:bg-white w1100:rounded-[4px] w1100:py-[30px]  w1100:w-fit w-phone:w-[calc(100%-30px)] ">
        <div className="logo-section w-[200px] invisible  w1100:visible w1100:mb-[20px] ">
          <img src="/assets/logo.svg" alt="" />
        </div>{" "}
        <h1 className="title text-[33px]  w1300:text-[28px] w1100:text-[24px] font-semibold text-center   ">
          Sign up {" "}
        </h1>
        <p className="w1300:text-[15px] text-[#414143] font-[400] w1100:text-[14px] text-center  ">
          Empower your experience, sign up for a freae account today{" "}
        </p>
        <div className="w-[600px] max-w-[90%] w1300:max-w-full w-phone:w-full">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

import { MailIcon } from "../icons";

export function Footer() {
  return (
    <div className="flex justify-between items-center h-24 p-8 w-full  ">
      <span className="text-[#667085] text-xs font-[400]" >© Meducate 2024</span>
      <div className="flex gap-2 items-center ">
        <MailIcon className="text-[#667085]  w-[16px] h-[16px] " />
        <span className="text-xs  text-[#667085] font-[400] ">help@meducate.com</span>
      </div>
    </div>
  );
}
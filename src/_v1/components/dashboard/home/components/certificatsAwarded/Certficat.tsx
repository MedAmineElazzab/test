import { RawCertificat } from "@/_v1/icons";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export default function Certficat() {
  return (
    <div className="certificat flex items-start w-full  gap-2  ">
      <div className="icon w-[40px] bg-primary-normal/10 h-[34px] rounded-md flex justify-center items-center">
        <RawCertificat className="text-primary-normal w-[30px] mt-1" />
      </div>
      <div className="relative details w-[calc(100%-40px)] flex items-center ">
        <div className="dt flex flex-col gap-1 w-[calc(100%-40px)]">
          <h2 className="text-black font-[600] text-[15px] ">
            Nom du certificat
          </h2>
          <p className="text-[#636363] line-clamp-2  text-[14px] m-0 p-0">
            Faculté de Médecine et de Pharmacie Université Hassan II -
            Casablanca
          </p>
        </div>
        <Link
          className="go-to hover:bg-opacity-20 border hover:border-primary-normal/30 hover:text-primary-normal  transition-all  relative w-[40px] h-[40px] rounded-[12px] flex justify-center items-center  bg-primary-normal text-white"
          href={"#"}
        >
          <IconArrowRight stroke={1.4} className="w-[19px]" />
        </Link>
      </div>
    </div>
  );
}

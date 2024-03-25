import { RawCertificat } from "@/_v1/icons";
import Fnote from "@/_v1/icons/sources/Fnote";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export default function FavouriteNote() {
  return (
    <div className="FavouriteNotes flex items-start w-full gap-3  ">
      <div className="icon w-[40px] bg-primary-normal/10  rounded-md flex justify-center items-center">
        <Fnote className="text-primary-normal w-[41px] mt-1" />
      </div>
      <div className="relative details h-full w-[calc(100%-40px)] flex items-center ">
        <div className="dt flex flex-col h-full justify-between py-[2px] w-[calc(100%-70px)] mr-[20px]">
          <h2 className="text-black font-[600] text-[15px] line-clamp-1 ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis id dolore, autem error laudantium, l{" "}
          </h2>
          <p className="text-[#636363] line-clamp-2  text-[14px] m-0 p-0">
            Mise à jour il y a 2 jours
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

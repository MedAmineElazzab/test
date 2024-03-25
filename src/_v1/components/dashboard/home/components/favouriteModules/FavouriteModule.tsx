import { Progress } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export default function FavouriteModule() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="details w-[calc(100%-40px)] flex flex-col gap-2 ">
        <h2 className="text-[#344154] text-[15px] font-[500] ">
          Facteurs associés à la prescription médicamenteuse
        </h2>
        <div className="flex  items-center flex-col w-full gap-2 ">
          <span className="text-[#94A3B8] w-full">6 / 10 Modules {"(100%)"}</span>
          <Progress
            styles={{
              root: {
                backgroundColor: "#e6edfc",
                borderRadius: "30px",
                height: "5px",
              },
              bar: {
                backgroundColor: "#0049E0",
              },
            }}
            value={60}
            className="w-full"
          />
        </div>
      </div>
      <Link
        className="go-to hover:bg-opacity-20 border hover:border-primary-normal/30 hover:text-primary-normal  transition-all  relative w-[40px] h-[40px] rounded-[12px] flex justify-center items-center  bg-primary-normal text-white"
        href={"#"}
      >
        <IconArrowRight stroke={1.4} className="w-[19px]" />
      </Link>
    </div>
  );
}

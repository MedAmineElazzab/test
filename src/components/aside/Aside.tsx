import { LOGO_MEDUCATE } from "@/common/constants";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  theme?: "light" | "dark";
}

export function Aside(props: Props) {
  return (
    <aside
      className={
        "relative h-full flex flex-col w-22 p-4 gap-6 bg-primary-normal transition-all"
      }
    >
      <Link href={"/"} className="m-auto w-13 flex justify-center items-center">
        <img
          alt="logo meducate"
          className="w-full"
          src={LOGO_MEDUCATE}
        />
      </Link>
      <div className="h-0.5 w-full rounded-full max-w-[85%] m-auto bg-black/10"></div>
      <div className="flex-1 flex mb-8">
        <div className="navs w-full flex flex-col gap-2 items-center">
          {props.children}
        </div>
      </div>
    </aside>
  );
}

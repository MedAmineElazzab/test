/* eslint-disable @next/next/no-img-element */
import {
  CertificatsIcon,
  CongresIcon,
  MasterIcon,
  MedicamentsIcon,
  ModulesIcon,
  NotesIcon,
  SeriesIcon,
  SimulationsIcon,
} from "@/_v1/icons";
import { AsideItem } from "@/components";
import Link from "next/link";
import { useRouter } from "next/router";
import { cloneElement } from "react";

interface Props {
  // dark: boolean;
}

export default function Aside() {
  const {  route , pathname } = useRouter();
  const Menu: { name: string; icon: JSX.Element; href: string }[] = [
    {
      name: "Notes",
      icon: <NotesIcon />,
      href: "/v2/notes",
    },
    {
      name: "Séries",
      icon: <SeriesIcon />,
      href: "/v2/series",
    },
    {
      name: "Modules",
      icon: <ModulesIcon />,
      href: "/v2/modules",
    },
    {
      name: "Certificats",
      icon: <CertificatsIcon />,
      href: "/v2/certificats",
    },
    {
      name: "Master class",
      icon: <MasterIcon />,
      href: "/v2/master-class",
    },
    {
      name: "Congrès",
      icon: <CongresIcon />,
      href: "/v2/congres",
    },
    {
      name: "Médicaments",
      icon: <MedicamentsIcon />,
      href: "/v2/medicaments",
    },
    {
      name: "Simulations",
      icon: <SimulationsIcon />,
      href: "/v2/simulations",
    },
  ];
  return (
    <aside
      className={`relative h-full flex flex-col w-[82px]  p-[14px] px-[17px]  gap-[24px]  bg-primary-normal  transition-all`}
    >
      <Link
        href={"/"}
        className="m-[auto] w-[50px] flex justify-center items-center  "
      >
        <img alt="" className="w-[50px]" src="/assets/meducate-logo.svg" />
      </Link>
      <div className="h-[2px] w-[100%] rounded-full max-w-[85%] m-auto bg-[#00000019]"></div>
      <div className="flex-[1] flex mb-[30px]">
        <div className="navs  w-full flex flex-col gap-[8px]  items-center">
          {Menu?.map((el, index) => {
            return (
              <AsideItem
                key={index}
                {...el}
                active={route.includes(el.href)}
                icon={cloneElement(el.icon, {
                  className: `w-[50px] h-[50px] transition-all text-[#94A3B8] ${
                    route == el.href || pathname.includes(el.href)
                      ? "bg-primary-normal  rounded-[15px] !text-white font-bold"
                      : "hover:bg-primary-normal  rounded-[15px] hover:!text-white hover:font-bold"
                  }  `,
                })}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
}

import Badge from "@/_v1/components/badges/Badge";
import { Divider } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";

interface ExpertCardProps {
  image: string;
  firstName: string;
  lastName: string;
  speciality: string;
  id: string | number;
  slug: string;
}
export default function ExpertCard({
  image,
  firstName,
  lastName,
  speciality,
  id,
  slug,
}: ExpertCardProps) {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-sm group">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${image}')`,
        }}
        className="w-full  h-full bg-center bg-cover transition-transform duration-[.4s] ease-in-out absolute top-0 left-0"
      >
        <div className="absolute top-0 w-[100%] h-[100px]  duration-[.4s] ease-in-out transition-all translate-y-0 opacity-100 bg-black/40i blur-[30px] "></div>
        <div className="absolute bottom-0 w-[100%] h-[100px] duration-[.4s] ease-in-out transition-all translate-y-0 opacity-100 bg-black/40i blur-[30px] "></div>
      </div>
      <div className="relative w-full h-full content-card z-[1]">
        <div className="badges  duration-[.4s] ease-in-out opacity-100 translate-x-0 absolute top-2 flex flex-col gap-1">
          <Badge className="bg-primary-normal text-white rounded-none border-primary-normal">
            Pharmacien
          </Badge>
          <Badge className="bg-primary-normal text-white rounded-none border-primary-normal">
            Médecin
          </Badge>
        </div>
        <div className="absolute w-full  flex text-white gap-3 flex-col justify-center duration-[.4s] ease-in-out transition-all bottom-5   name-profession">
          <h1 className="name font-[900] text-[45px] uppercase text-center ">
            {firstName} <br /> {lastName}
          </h1>
          <div className="flex items-center  duration-[.4s] ease-in-out opacity-100 justify-center w-full">
            <Divider
              orientation="horizontal"
              size={"md"}
              className=" w-[20px] "
            />
          </div>
          <span className="text-center    duration-[.4s] ease-in-outopacity-70 ">
            {speciality}
          </span>
          <div className="con w-full flex justify-center duration-[.4s] ease-in-out opacity-100">
            <Link
              href={"/experts/" + slug}
              className="px-4 py-2 rounded-[4px] text-black w-fit bg-white flex items-center gap-2 "
            >
              <IconInfoCircle className="w-[19px]" />
              View expert info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

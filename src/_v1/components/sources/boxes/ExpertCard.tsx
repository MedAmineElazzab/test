import { calculateHeight } from "@/_v1/functions";
import ThumbnailCard from "./ThumbnailCard";
import Link from "next/link";
import { IconInfoCircle } from "@tabler/icons-react";
import { Divider } from "@mantine/core";
import { FullPath } from "@/_v1/lib/utils";

interface Props {
  lastName: string;
  firstName: String;
  photo: string;
  note: string;
  slug: string;
  expertises: any[];
  className?: string;
  typeStyle:String;
}
const ExpertCard = ({
  lastName,
  firstName,
  note,
  photo,
  slug,
  expertises,
  className,
  typeStyle,
}: Props) => {
  return (
    // <div
    //   className={`
    //   relative 
    //   w-[100%] max-w-[calc(100%-20px)]
    //   2xl:max-w-[calc(25%-20px)] xl:max-w-[calc(25%-20px)] lg:max-w-[calc(33.33%-20px)] md:max-w-[calc(33.33%-20px)] sm:max-w-[calc(50%-20px)]
    //   ${className}
    //   overflow-hidden
    //   group
    // `}
    // >
    //   <div
    //     className="w-[100%]"
    //     style={{ paddingBottom: calculateHeight(200, 345) }}
    //   >
    //     <div className="absolute top-[0] right-[0] z-[1] w-[100%] h-[100%] bg-slate-900 transition-transform duration-[.4s] ease-in-out group-hover:scale-[1.1]">
    //       <ThumbnailCard height="100%" path={photo} />
    //     </div>
    //     <div className="absolute top-[0] right-[0] z-[2] w-[100%] h-[100%]">
    //       <div className="absolute top-[30px] left-[0] flex items-start flex-col gap-[10px] -translate-x-[100px] opacity-0 duration-[.4s] ease-in-out group-hover:opacity-100 group-hover:translate-x-0">
    //         {expertises?.map((e: any, _: number) => (
    //           <span
    //             key={_}
    //             className="px-[10px] py-[4px] bg-[#0049E0] text-[#ffffff]"
    //           >
    //             {e?.name}
    //           </span>
    //         ))}
    //       </div>
    //       <div className="absolute gap-[12.5px] text-center w-[100%] px-[15px] justify-center items-center flex flex-col duration-[.4s] ease-in-out transition-all group-hover:bottom-[30px] bottom-[-110px]">
    //         <h3 className="text-[34px] font-bold uppercase">{name}</h3>
    //         <span className="w-[14px] h-[2px] bg-[#ffffff]"></span>
    //         <p className="text-[14px] capitalize min-h-[35px] opacity-0 duration-[.4s] ease-in-out group-hover:opacity-70">
    //           {note}
    //         </p>
    //         <div className="con w-full flex justify-center opacity-0 duration-[.4s] ease-in-out group-hover:opacity-100">
    //           <Link
    //             href={`/experts/${slug}`}
    //             className="px-4 py-2 rounded-[4px] text-black w-fit bg-white flex items-center gap-2 "
    //           >
    //             <IconInfoCircle className="w-[19px]" />
    //             View expert info
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

<div  className= {`relative overflow-hidden group h-[428px] flex flex-col justify-between gap-2 py-[15px]  bg-white hover:shadow-note transition-all
2xl:max-w-[calc(20%-15px)] xl:max-w-[calc(20%-15px)] lg:max-w-[calc(25%-15px)] md:max-w-[calc(33.33%-15px)] sm:max-w-[calc(50%-15px)] w-[calc(100%-15px)] hover:cursor-pointer ${typeStyle == "masterClasse" && "  lg:max-w-[calc(33.33%-15px)] xl:max-w-[calc(25%-15px)] 2xl:max-w-[calc(25%-15px)] h-[340px] "}` }>       
 <Link   href={`/experts/${slug}`} >
     <img src={ FullPath("") } alt="expert photo" className='w-[100%] absolute top-[0px] left-[0px] h-[100%] object-cover ' />
    <div className=' flex flex-col gap-[7px] badges -translate-x-[100px] opacity-0 duration-[.4s] ease-in-out group-hover:opacity-100 group-hover:translate-x-0 absolute top-[15px] items-start ' >
        <span className=' w-[max-content] text-[white] text-[14px] font-[400] leading-[21px] px-[10px] py-[4px] bg-[#0049E0] z-[2] relative ' >Pharmacien</span>
        <span className=' w-[max-content] text-[white] text-[14px] font-[400] leading-[21px] px-[10px] py-[4px] bg-[#0049E0] z-[2] relative ' >Médecin</span>
    </div>
    <div className="absolute w-full  flex text-white gap-3 flex-col items-center justify-center duration-[.4s] ease-in-out transition-all group-hover:bottom-5 bottom-[-53px]  name-profession">
        <h1 className="name font-[900] text-[40px] uppercase text-center leading-[40px] mx-[5px] ">
            {firstName} <br /> {lastName}
        </h1>
        <div className="flex items-center opacity-0 duration-[.4s] ease-in-out group-hover:opacity-100 justify-center w-full">
            <Divider
            orientation="horizontal"
            size={"3.5px"}
            className=" w-[16px]"
            color="white"
            />
        </div>
        <span className="text-center  leanding-[17px] opacity-0 duration-[.4s] ease-in-out group-hover:opacity-100 tracking-[0.9px] max-w-[172px] mx-10px text-[14px] text-[white]">
            {note}
        </span>
    </div>
  </Link>
</div>
  );
};

export default ExpertCard;

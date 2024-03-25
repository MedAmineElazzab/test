import { DoctorVector } from "@/_v1/icons";
import { IconStarFilled } from "@tabler/icons-react";
import React from "react";

export interface SwiperCardProps {
  name: string;
  role: string;
  description: string;
  rating: number;
  icon ?: JSX.Element
}

const SwiperCard: React.FC<SwiperCardProps> = ({
  name,
  role,
  description,
  rating,
  icon
}) => {
  return (
    <div className="w-full h-full gap-5 px-3 flex flex-col justify-between ">
      <div className="header flex items-center gap-3">
        <div className="icon">
          {icon}
          {/* <img className="w-[50px] h-[50px] rounded-full object-cover" src="/assets/images/placeholder.png" alt="" /> */}
        </div>

        <div className="details flex flex-col">
          <h1 className="text-[17px] font-[500]">{name}</h1>
          <span className="text-gray-500">{role}</span>
        </div>
      </div>
      <p className="px-2 text-gray-700">{description}</p>

      <div className="flex items-center gap-1 w-full justify-end text-secondry-normal">
        {Array.from({ length: rating }, (_, index) => (
          <IconStarFilled className="w-[15px]" key={index} />
        ))}
      </div>
    </div>
  );
};

export default SwiperCard;

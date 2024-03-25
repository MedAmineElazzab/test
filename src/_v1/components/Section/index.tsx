import { useState } from "react";

export interface SectionProps {
  active: boolean;
  Icon: JSX.Element;
  name: string;
  sectionId: number;
  onClick?: (isActive: boolean, setActive: any, sectionId: number) => void;
}
export default function Section({
  active,
  Icon,
  name,
  onClick,
  sectionId,
}: SectionProps) {
  const [isActive, setActive] = useState<boolean>(active || false);
  return (
    <div
      onClick={() => {
        onClick?.(isActive, setActive, sectionId);
      }}
      className={`w-full  cursor-pointer select-none transition-all relative py-[20px] gap-3 flex items-center px-[20px] ${
        isActive ? "bg-primary-normal text-white" : "bg-white text-[#333]"
      }  border border-[#E2E8F0] rounded-[13px]`}
    >
      <CheckBoxSHape active={isActive || false} />
      {Icon}
      <span className="font-[600]">{name}</span>
    </div>
  );
}

export function CheckBoxSHape({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className="transition-all"
    >
      <circle
        cx="11"
        cy="11"
        r="10"
        className={`${active ? "stroke-white" : "stroke-primary-normal"}`}
      />
      <circle
        cx="11"
        cy="11"
        r="6"
        className={`${active ? "fill-white" : "fill-primary-light"}`}
      />
    </svg>
  );
}
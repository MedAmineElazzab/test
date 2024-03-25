import { useState } from "react";

export interface QuizOptionProps {
  checked: boolean;
  name: string;
  optionId: number;
}
export default function QuizOption({
  checked,
  name,
  optionId,
}: QuizOptionProps) {
  const [isActive, setActive] = useState<boolean>(checked || false);
  return (
    <div
      onClick={() => {
        setActive(!isActive);
      }}
      className={`w-full  cursor-pointer select-none transition-all relative py-[20px] gap-3 flex items-center px-[20px] ${
        isActive ? "bg-primary-normal text-white" : "bg-white text-[#333]"
      }  border border-[#E2E8F0] rounded-[13px]`}
    >
      <CheckBoxSHape active={isActive || false} />
      <span className="text-[20px]">{name}</span>
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

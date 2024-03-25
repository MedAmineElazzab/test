import { PhoneIcon } from "@/_v1/icons";
import React, { forwardRef, useState } from "react";
import { Input, Select } from "../index";
const data = [
  {
    image: "https://flagicons.lipis.dev/flags/4x3/ma.svg",
    label: "(+212)",
    name: "Morocco",
    value: "+212",
  },
  {
    image: "https://flagicons.lipis.dev/flags/4x3/ga.svg",
    name: "Gabon",
    value: "+241",
    label: "(+241)",
  },
  {
    image: "https://flagicons.lipis.dev/flags/4x3/ci.svg",
    name: "Côte dIvoire",
    value: "+225",
    label: "(+225)",
  },
  {
    image: "https://flagicons.lipis.dev/flags/4x3/sn.svg",
    name: "Senegal",
    value: "+221",
    label: "(+221)",
  },
];

export interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  name: string;
}
export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, name, ...others }: ItemProps, ref) => (
    <div className="" ref={ref} {...others}>
      <div className="flex items-center gap-2">
        <img src={image} className="w-[25px] h-[15px] object-cover " alt="" />
        <span className="text-sm">{name}</span>
      </div>
    </div>
  )
);
SelectItem.displayName = "SelectItem";
interface PhoneNumberInputProps {
  onChange?: (code: string, phone: string) => void;
  error?: string | null;
}

export default function PhoneNumberInput({
  onChange,
  error,
}: PhoneNumberInputProps) {
  const [selected, setSelected] = useState<ItemProps>();
  const [code, setCode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  onChange?.(code, phone);
  return (
    <>
      <div
        tabIndex={-1}
        className={" phoneNumberInput flex items-center w-full group bg-white transition-colors focus-within:border-[#0049e0] border-[0.0625rem] border-[#ced4da]  rounded-[0.25rem]".concat(
          " ",
          error ? "!bg-[#ffe0e0] border-[#fa5252]" : ""
        )}
      >
        <Select
          borderless={"true"}
          className="w-[120px] w-phone:w-[160px]  h-[100%]"
          icon={
            selected ? (
              <img alt="" className="w-[20px]" src={selected?.image} />
            ) : (
              <PhoneIcon className="w-[22px] text-[#333]" />
            )
          }
          placeholder="ex: (+212)"
          itemComponent={SelectItem}
          data={data}
          onChange={(val) => {
            setSelected(data?.find((el) => el.value === val));
            setCode(val as string);
          }}
          maxDropdownHeight={400}
          styles={{
            input: {
              border: "none",
              background: error ? "transparent" : "white",
              marginTop:"0px",
              boxShadow:"none!important"
            },
          }}
          nothingFound="Nobody here"
          sx={{
            [".mantine-Select-dropdown"]: {
              width: "fit-content !important",
              marginTop:"0px"

            },
            ["input::placeholder"]: {
              color: error ? "#fa5252" : "",
            },
            ["input"]: {
              color: error ? "#fa5252" : "",
              marginTop:"0px"
            },
          }}
        />
        <Input
          type="number"
          className={"w-[80%] border-l group-focus-within:border-l-[#0049e0] bg-transparent ".concat(
            error ? "border-[#fa5252] text-[#fa5252] " : ""
          )}
          styles={{
            input: {
              border: "none",
              background: error ? "transparent" : "white",
            },
          }}
          sx={{
            ["input::placeholder"]: {
              color: error ? "#fa5252" : "",
            },
          }}
          placeholder="Enter phone number"
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
        />
      </div>
      {error && (
        <span className="text-[#fa5252] flex items-center gap-1 mt-1 capitalize text-[calc(0.875rem-0.125rem)] ">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[13px]"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Warning / Info">
                {" "}
                <path
                  id="Vector"
                  d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
          {error}
        </span>
      )}
    </>
  );
}

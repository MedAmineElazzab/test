import { PhoneIcon } from "@/_v1/icons";
import { useGetCountries } from "@/api";
import { NumberInput } from "@mantine/core";
import React, { ReactNode, forwardRef, useEffect, useState } from "react";
import { Select } from "../index";
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
        <span className="text-sm">{name || ""}</span>
      </div>
    </div>
  )
);
SelectItem.displayName = "SelectItem";
interface PhoneNumberInputProps {
  onChange?: (code: string | null, phone: number | null) => void;
  error?: string | null | ReactNode;
  label?: JSX.Element | string;
  className?: string;
}

export function PhoneNumberInput({
  onChange,
  error,
  label,
  className,
}: PhoneNumberInputProps) {
  const [selected, setSelected] = useState<ItemProps>();
  console.log(selected);
  const [code, setCode] = useState<string>("");
  const [phone, setPhone] = useState<number | null>(null);
  const [shouldFireOnChange, setShouldFireOnChange] = useState<boolean>(false);
  const {
    data: countries,
    isLoading: isLoadingCountries,
    isError: isErrorCountries,
  } = useGetCountries({
    sortBy: "name_fr",
    sortOrder: "asc",
  });
  const handleNumberInputChange = (val: number | "") => {
    if (val === "") {
      setPhone(null);
    } else {
      setPhone(val as number);
    }
    setShouldFireOnChange(true);
  };

  useEffect(() => {
    if (shouldFireOnChange) {
      onChange?.(code, phone);
      setShouldFireOnChange(false);
    }
  }, [shouldFireOnChange, code, phone, onChange]);
  return (
    <div className={className}>
      {label && (
        <div className="mb-1">
          <label htmlFor="" className="text-sm  font-medium ">
            {label}
          </label>
        </div>
      )}
      <div
        tabIndex={-1}
        className={"relative phoneNumberInput flex items-center  w-full group bg-white transition-colors focus-within:border-[#0049e0]  border-[0.0625rem] border-[#ced4da]  rounded-[0.25rem]".concat(
          " ",
          error
            ? "focus-within:border-[#FDA29B] !border-[#FDA29B] shadow-inputErrored focus-within:shadow-inputErrored"
            : " focus-within:shadow-input"
        )}
      >
        {!isLoadingCountries && (
          <Select
            alt="select-phone"
            borderless={true}
            className="w-[200px] w-phone:w-[160px]  h-[100%]"
            icon={
              selected ? (
                <img alt="" className="w-[20px]" src={selected?.image} />
              ) : (
                <PhoneIcon className="w-[18px] text-[#333]" />
              )
            }
            placeholder=" code pays"
            searchable
            itemComponent={SelectItem}
            data={
              countries
                ?.filter((country) => country.phone_prefix != null)
                ?.map((country) => ({
                  image: country.flag,
                  name: country.name_fr,
                  value: country.phone_prefix + "," + country.id,
                  label: country.phone_prefix
                    ? ` ${country.alpha2_code} ${country.phone_prefix}`
                    : "",
                })) || []
            }
            onChange={(val) => {
              setShouldFireOnChange(true);
              let selected = countries?.find(
                (el) => el.phone_prefix + "," + el.id === val
              );
              setSelected({
                image: selected?.flag as string,
                label: selected?.name_fr as string,
                name: selected?.name_fr as string,
              });
              setCode(val as string);
            }}
            maxDropdownHeight={400}
            styles={{
              input: {
                border: "none",
                background: error ? "transparent" : "white",
                marginTop: "0px",
                boxShadow: "none!important",
              },
            }}
            nothingFound="Nobody here"
            sx={{
              [".mantine-Select-dropdown"]: {
                maxWidth: "200px",
                minWidth: "200px",
                marginTop: "0px",
              },
              [".mantine-95qma6"]: {
                paddingLeft: "38px",
              },
            }}
          />
        )}

        <NumberInput
          hideControls
          min={0}
          maxLength={12}
          minLength={9}
          type="number"
          onKeyDown={(e) => {
            if (
              !(
                e.key === "Backspace" ||
                ((e.ctrlKey || e.metaKey) && e.key === "a")
              ) &&
              !/^[0-9]+$/.test(e.key)
            ) {
              e.preventDefault();
            }
          }}
          pattern="\d*"
          alt="input-phone"
          className={"w-[80%] border-l  bg-transparent".concat(
            error
              ? " text-[#fa5252] !border-[#FDA29B] group-focus-within:border-l-[#fa5252] "
              : "group-focus-within:border-l-[#0049e0]"
          )}
          styles={{
            input: {
              border: "none",
              background: error ? "transparent" : "white",
              color: error ? "#fa5252" : "",
            },
          }}
          sx={{
            ["input::placeholder"]: {
              color: error ? "#fa5252" : "",
            },
          }}
          placeholder="Entrer le numéro de téléphone"
          onChange={handleNumberInputChange}
        />
      </div>
      {error && (
        <div className="w-full text-[#F04438] font-normal text-sm pt-2 ">
          {error}
        </div>
      )}
    </div>
  );
}

import SelectArrow from "@/_v1/icons/sources/SelectArrow";
import { Select as SelectMantine, SelectProps } from "@mantine/core";
import { useEffect, useState } from "react";

interface CustomSelectProps extends SelectProps {
  borderless?: string | boolean;
  selectedValue?: string;
}

export function Select({
  value,
  onChange,
  defaultValue,
  selectedValue,
  ...props
}: CustomSelectProps) {
  const selectArrow = <SelectArrow className="w-3 h-3" />;
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  useEffect(() => {
    setIsEmpty(defaultValue || value ? true : false);
    return () => {
      setIsEmpty(false);
    };
  }, [props.id]);
  return (
    <>
      <SelectMantine
        {...props}
        onChange={(val) => {
          onChange?.(val);
          if (val != null) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
        }}
        rightSection={!isEmpty ? selectArrow : null}
        defaultValue={value || defaultValue || undefined}
        className={`${props.error != undefined ? "Input-errored" : ""} `.concat(
          String(props.className || "")
        )}
        styles={{
          rightSection: { pointerEvents: "none", transition: ".2s" },
          root: { overflow: "hidden" },
          ...props.styles,
        }}
        nothingFound={
          <div className="flex justify-center items-center">
            <span>pas de résultats</span>
          </div>
        }
        sx={{
          input: {
            border: props.borderless ? "none" : "",
            padding: "22px 14px",
            paddingRight: "36px!important",
            overflow: "hidden",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          },

          [".mantine-Select-item"]: {
            color: "#101828",
          },
          ["input[data-invalid='true']"]: {
            boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
            borderColor: "#FDA29B!important ",
            color: "inherit",
          },
          ["input[data-invalid='true']::placeholder"]: {
            color: "inherit",
            opacity: "40%",
          },
          [".mantine-igi3vk[data-with-icon]"]: {
            paddingLeft: "40px!important",
          },
          ["input[data-invalid='true']:focus"]: {
            boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
            borderColor: "#FDA29B!important ",
          },
          [".mantine-Select-item[data-selected='true']"]: {
            position: "relative",
            fontWeight: 500,
            color: "#101828",
            lineHeight: "24px",
            backgroundColor: "#F9FAFB",
          },
          [".mantine-Select-item[data-selected='true']:after"]: {
            content: '"✓"',
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "22px",
            color: "blue",
            backgroundSize: "cover",
            backgroundColor: "#fff",
          },
          [".mantine-Select-item[data-selected='true']:hover"]: {
            color: "#101828",
            // fontWeight : 400,
            backgroundColor: "#F9FAFB",
          },
          [".mantine-Select-item:hover"]: {
            backgroundColor: "#F9FAFB",
          },
          [".mantine-Select-rightSection"]: {
            height: "calc(100% - 2px)",
            top: "1px",
            right: "1px",
            borderRadius: "10px",
          },
          [".mantine-Select-rightSection svg"]: {
            transition: ".2s",
            // width: "23px !important",
            // height: "23px !important",
          },
          ["div[aria-expanded='true'] .mantine-Select-rightSection svg"]: {
            transform: "rotate(180deg)",
          },
          ["input:focus"]: {
            borderColor: props.alt != "select-phone" ? " #0049e0" : "",
            boxShadow:
              props.alt != "select-phone"
                ? "0px 0px 0px 4px #E6EDFC!important"
                : "",
            borderRadius: "4px",
          },
          [".mantine-Select-itemsWrapper"]: {
            gap: "4px",
          },
          label: {
            marginBottom: "5px",
            color: "#344054",
          },
          [".mantine-kcpopt[data-with-icon]"]: {
            paddingLeft: "45px",
          },
          ...props.sx,
        }}
        transitionProps={{
          transition: "fade",
          duration: 80,
          timingFunction: "ease",
        }}
        error={
          props.error !== undefined ? (
            <div className="w-full text-[#F04438] font-normal text-sm pt-1 ">
              {props.error}
            </div>
          ) : null
        }
      />
    </>
  );
}

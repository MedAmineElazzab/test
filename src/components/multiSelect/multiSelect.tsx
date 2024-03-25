import {
  MultiSelect as MultiSelectMantine,
  MultiSelectProps as MultiSelectMantineProps,
} from "@mantine/core";
import { SelectArrow } from "@/components";
interface MultiSelectProps extends MultiSelectMantineProps {}
export function MultiSelect(props: MultiSelectProps) {
  return (
    <MultiSelectMantine
      rightSection={<SelectArrow className="rotate-180" />}
      {...props}
      sx={{
        [".mantine-MultiSelect-input"]: {
          color: "inherit",
          padding: "5px 15px",
        },
        [".mantine-MultiSelect-input[data-invalid='true']"]: {
          boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
          borderColor: "#FDA29B!important ",
          color: "inherit",
        },

        [".mantine-MultiSelect-input[data-invalid='true']:focus"]: {
          boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
          borderColor: "#FDA29B!important ",
        },
        [".mantine-MultiSelect-input:focus,.mantine-MultiSelect-input:focus-within"]:
          {
            borderColor: "#0049e0 !important",
            boxShadow: "0px 0px 0px 4px #E6EDFC !important",
            borderRadius: "4px",
          },
        [".mantine-Input-wrapper"]: {
          overflow: "initial !important",
        },
        label: {
          color: "currentcolor",
          marginBottom: "5px",
        },
        [".mantine-MultiSelect-defaultValue"]: {
          padding: "14px 12px",
          borderRadius: "30px",
          display: "flex",
          fontSize: "14px",
          color: "#344054",
          maxWidth: "40%",
        },
        [".mantine-MultiSelect-defaultValue svg"]: {
          color: "#667085",
        },
        [".mantine-MultiSelect-input[data-invalid='true'] input::placeholder"]:
          {
            color: "inherit",
          },
        ...props?.sx,
      }}
      error={
        props.error !== undefined ? (
          <div className="w-full text-[#F04438] font-normal text-sm pt-1 ">
            {props.error}
          </div>
        ) : null
      }
    />
  );
}

import {
  YearPickerInput as YearPickerInputMantine,
  YearPickerInputProps as YearPickerInputPropsMantine,
} from "@mantine/dates";
import SelectArrow from "@/_v1/icons/sources/SelectArrow";

interface YearPickerInputProps extends YearPickerInputPropsMantine {}
export function YearPickerInput(
  props: YearPickerInputProps & React.ComponentPropsWithoutRef<"input">
) {
  return (
    <YearPickerInputMantine
      {...props}
      sx={{
        [".mantine-YearPickerInput-input"]: {
          color: "inherit",
          padding: "12px 15px",
        },
        [".mantine-YearPickerInput-input[data-invalid='true']"]: {
          boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
          borderColor: "#FDA29B!important ",
          color: "inherit",
        },
        [".mantine-3elbod"]: {
          color: "inherit !important",
        },
        [".mantine-YearPickerInput-input[data-invalid='true']::placeholder"]: {
          color: "inherit",
          opacity: "40%",
        },
        [".mantine-YearPickerInput-input[data-invalid='true']:focus"]: {
          boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
          borderColor: "#FDA29B !important ",
        },
        [".mantine-YearPickerInput-input:focus"]: {
          borderColor: "#0049e0",
          boxShadow: "0px 0px 0px 4px #E6EDFC!important",
          borderRadius: "4px",
        },
        [".mantine-YearPickerInput-pickerControl[data-selected]"]: {
          backgroundColor: "#0049e0",
        },
        [".mantine-1bpldn3[data-with-icon]"]: {
          paddingLeft: "41px",
        },
        label: {
          color: "currentcolor",
          marginBottom: "5px",
        },
        ...props?.sx,
      }}
      rightSection={<SelectArrow className="w-3 h-w-3" />}
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

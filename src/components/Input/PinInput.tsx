import { PinInput as PinInputMantine, PinInputProps } from "@mantine/core";
export function PinInput({
  value,
  onChange,
  ...props
}: PinInputProps & { label?: JSX.Element | string }) {
  return (
    <div className="flex flex-col">
      {props.label && (
        <label className="text-sm font-medium ">{props.label}</label>
      )}
      <PinInputMantine
        sx={{
          ["input[data-invalid='true']"]: {
            boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
            borderColor: "#FDA29B!important ",
            color: "inherit",
          },
          ["input[data-invalid='true']::placeholder"]: {
            color: "inherit",
          },
          ["input[data-invalid='true']:focus"]: {
            boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
            borderColor: "#FDA29B!important ",
          },
          ["input:focus"]: {
            borderColor: " #0049e0",
            boxShadow: "0px 0px 0px 4px #E6EDFC!important",
            borderRadius: "4px",
          },

          ...props.sx,
        }}
        className="mt-1"
        onChange={onChange}
        defaultValue={value || ""}
        styles={{
          input: {
            padding: "22px 0",
            width: "100%",
          },
          ...props.styles,
        }}
        {...props}
      />
    </div>
  );
}

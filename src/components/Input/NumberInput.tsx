import {
  NumberInput as NumberInputMantine,
  NumberInputProps as NumberInputPropsMantine,
} from "@mantine/core";
interface NumberInputProps extends NumberInputPropsMantine {}
export function NumberInput(props: NumberInputProps) {
  return (
    <NumberInputMantine
      {...props}
      hideControls
      onKeyDown={(e) => {
        (["e", "E", "+", "-", ".", "^", ""].includes(e.key) ||
          (e.currentTarget.value.length >= 9 && e.key != "Backspace")) &&
          e.preventDefault();
      }}
      sx={{
        input: {
          color: "inherit",
          padding: "22px 10px",
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
        ["input[data-invalid='true']:focus"]: {
          boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
          borderColor: "#FDA29B!important ",
        },
        ["input:focus"]: {
          borderColor: props.alt != "input-phone" ? " #0049e0" : "",
          boxShadow:
            props.alt != "input-phone"
              ? "0px 0px 0px 4px #E6EDFC!important"
              : "",
          borderRadius: "4px",
        },
        label: {
          color: "currentcolor",
          marginBottom: "5px",
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

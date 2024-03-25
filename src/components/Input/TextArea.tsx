import {
  Textarea as TextareaMantine,
  TextareaProps as TextareaMantineProps
} from "@mantine/core";

interface TextAreaProps extends TextareaMantineProps {}
export function TextArea(props: TextAreaProps) {
  return (
    <TextareaMantine
      {...props}
      sx={{
        ["textarea:focus"]: {
          borderColor: "#0049e0",
          boxShadow: "0px 0px 0px 4px #E6EDFC!important",
          borderRadius: "4px",
        },
        ["textarea[data-invalid='true']"]: {
          boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
          borderColor: "#FDA29B!important ",
          color: "inherit",
        },
        ["textarea[data-invalid='true']::placeholder"]: {
          color: "inherit",
          opacity: "40%",
        },
      }}
      error={
        props.error !== undefined ? (
          <div className="w-full text-danger-normal font-normal text-sm pt-1">
            {props.error}
          </div>
        ) : null
      }
    />
  );
}

import { InVisibleEyeIcon, InfoIcon, VisibleEyeIcon } from "@/_v1/icons";
import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Input({ value, onChange, ...props }: TextInputProps) {
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <>
      <TextInput
        {...props}
        defaultValue={value || ""}
        onChange={onChange}
        rightSection={
          props.rightSection ? (
            props.rightSection
          ) : props.type === "password" ? (
            <ActionIcon onClick={toggle}>
              {visible ? (
                <VisibleEyeIcon className="w-[0.9375rem] h-[0.9375rem]" />
              ) : (
                <InVisibleEyeIcon className="w-[0.9375rem] h-[0.9375rem]" />
              )}
            </ActionIcon>
          ) : undefined
        }
        type={!visible ? props.type : "text"}
        error={
          props.error !== undefined ? (
            <div className="w-full text-[#F04438] font-normal text-sm pt-1 ">{props.error}</div>
          ) : null
        }
        className={` ${
          props.error !== undefined ? "Input-errored" : ""
        } ${String(props.className)}`}
        sx={{
          input: {
            color: "inherit",
            padding: "22px 10px",
          },
          ["input[data-invalid='true']"]: {
            boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
            borderColor: "#FDA29B!important ",
          },
          ["input[data-invalid='true']:focus"]: {
            boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
            borderColor: "#FDA29B!important ",
          },
          ["input:focus"]: {
            borderColor: "#0049e0",
          },
          label: {
            color: "currentcolor",
            marginBottom: "5px",
          },
          ...props?.sx,
        }}
      />
      <style>
        {`
          .Input-errored .mantine-Input-icon svg {
            color: #fa5252 !important;
          }
          
        `}
      </style>
    </>
  );
}

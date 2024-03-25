import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { EyeClosedIcon, EyeOpenedIcon } from "../icons";

export  function Input({ value, onChange, ...props }: TextInputProps) {
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
                <EyeOpenedIcon className="w-4 h-4" />
              ) : (
                <EyeClosedIcon className="w-4 h-4" />
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
        className={`${String(props.className)}`}
        sx={{
          input: {
            color: "inherit",
            padding: "22px 10px",
          },
          ["input[data-invalid='true']"]: {
            boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
            borderColor: "#FDA29B!important ",
            color : "inherit"
          },
          ["input[data-invalid='true']::placeholder"]: {
            color : "inherit",
            opacity : "40%"
          },
          ["input[data-invalid='true']:focus"]: {
            boxShadow: " 0px 0px 0px 4px #FEE4E2 !important",
            borderColor: "#FDA29B!important ",
          },
          ["input:focus"]: {
            borderColor:  props.alt!="input-phone" ? " #0049e0" : "",
            boxShadow: props.alt!="input-phone" ? "0px 0px 0px 4px #E6EDFC!important" : "",
            borderRadius: "4px"
          },
          label: {
            color: "currentcolor",
            marginBottom: "5px",
          },
          ...props?.sx,
        }}
      />
      
    </>
  );
}

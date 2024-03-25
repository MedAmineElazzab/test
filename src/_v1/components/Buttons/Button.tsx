import { CustomButtonProps } from "@/@types";
import { Button as ButtonB } from "@mantine/core";

export default function Button({ ...props }: CustomButtonProps) {
  return (
    <ButtonB
      {...props}
      sx={{
        [".mantine-1jbrfp"]: {
          marginRight: "0",
        },
        [".mantine-Button-inner"]: {
          gap: "10px",
        },
      }}
      className={`active:scale-[1] bg-primary-normal transition-all h-[44px] flex  justify-center items-center gap-2   ${
        props?.className || "bg-primary-normal "
      }`}
    >
      {props?.children}
    </ButtonB>
  );
}

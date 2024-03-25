import {
  Switch as SwitchMantine,
  SwitchProps as SwitchMantineProps,
} from "@mantine/core";
interface SwitchProps extends SwitchMantineProps {}
export function Switch(props: SwitchProps) {
  return (
    <SwitchMantine
      sx={{
        [".mantine-Switch-track"]: {
          width: "25px",
        },
        [".mantine-Switch-labelWrapper"]: {
          display: "block !important",
          flexDirection: "row",
        },
        ["input:checked+label"]: {
          backgroundColor: "#0049e0 !important",
          borderColor: "#0049e0 !important",
        },
        ["label"]: {
          color: "#344054",
          fontSize: "14px",
        },
      }}
      className="font-medium"
      {...props}
    />
  );
}

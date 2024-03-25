import {
  Button as ButtonMantine,
  ButtonProps as MantineButtonProps,
  clsx,
} from "@mantine/core";
interface Buttonprops extends Omit<MantineButtonProps, "color" | "size"> {
  color?:
    | "primary"
    | "secondary"
    | "white"
    | "danger"
    | "darkGray"
    | "success"
    | "yellow";
  size?: "md" | "sm";
}
export function Button({
  ...props
}: Buttonprops & React.ComponentPropsWithoutRef<"button">) {
  const classNames = clsx(props.className, {
    "bg-primary-normal text-white hover:bg-primary-dark focus:ring-primary-normal focus:ring-4 focus:ring-opacity-20":
      props.color === "primary" && props.variant === "filled",
    "!text-primary-normal border-primary-normal hover:bg-primary-normal/5":
      props.color === "primary" && props.variant === "outline",
    "text-primary-normal hover:bg-primary-normal/5":
      props.color === "primary" && props.variant === "subtle",
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-100 focus:ring-4":
      props.color === "danger" && props.variant === "filled",
    "bg-gray-300 text-white hover:bg-gray-dark focus:ring-gray-300 focus:ring-4 focus:ring-opacity-20":
      props.color === "secondary" && props.variant === "filled",
    "!text-gray-300 border-gray-300 hover:bg-gray-400/5":
      props.color === "secondary" && props.variant === "outline",
    "!bg-white border-gray-300 text-gray-700 ":
      props.color === "white" && props.variant === "outline",
    "!bg-white text-gray-700 border-gray-300 text-gray-700 ":
      props.color === "darkGray" && props.variant === "filled",
    " text-white bg-green-500 hover:bg-green-600 focus:ring-green-100 focus:ring-4":
      props.color === "success" && props.variant === "filled",
    "text-brown-normal bg-secondry-light  border-secondry-normal hover:bg-secondry-light":
      props.color === "yellow" && props.variant === "filled",
  });

  return (
    <ButtonMantine
      {...props}
      className={classNames}
      size={props.size}
      type={props.type}
    >
      {props.children}
    </ButtonMantine>
  );
}

import { Wording } from "@/lib";
import { ActionIcon, clsx } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

interface AlertProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  type: "success" | "danger";
  message: React.ReactNode;
  withCloseBtn?: boolean;
  onClose?: () => void;
  status?: "shown" | "hidden";
}
export function Alert(props: AlertProps) {
  const handleClose = () => {
    props.onClose?.();
  };
  if (props.status === "hidden") {
    return null;
  }

  const classNames = clsx("rounded-2xl py-1 px-3 flex items-start gap-2", {
    "bg-[#ECFDF3] text-[#027A48]": props.type === "success",
    "bg-[#FEF3F2] text-[#B42318]": props.type === "danger",
  });

  return (
    <div {...props} className={classNames}>
      <div
        className="type rounded-2xl capitalize bg-white py-[2px] px-2 text-xs font-medium text-center"
        data-type={props.type}
      >
        {Wording[props.type]}
      </div>
      <div className="message text-xs font-medium leading-5">
        {props.message}
      </div>
      {props.withCloseBtn && (
        <ActionIcon onClick={handleClose} size={"xs"} className="text-current">
          <IconX className="w-3 h-3" />
        </ActionIcon>
      )}
    </div>
  );
}

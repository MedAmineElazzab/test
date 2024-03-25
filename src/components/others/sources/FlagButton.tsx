import { Button, FlagIconOutlined, FlagIconSolid } from "@/components";
import { clsx } from "@mantine/core";
import { useState } from "react";

interface FlagButtonProps {
  onClick?: (isFlagged: boolean) => void;
  isFlagged: boolean;
}
export function FlagButton(props: FlagButtonProps) {
  const [isFlagged, setIsFlagged] = useState<boolean>(props.isFlagged);
  const classNames = clsx({
    "p-2 w-fit rounded flex bg-white transition-colors shadow-save-btn hover:bg-white  hover:shadow-flag-btn-hoverd  justify-center items-center ":
      true,
    " text-primary-normal": isFlagged === true,
  });

  return (
    <Button
      onClick={() => {
        setIsFlagged(!isFlagged);
        props?.onClick?.(isFlagged);
      }}
      className={classNames}
    >
      {isFlagged ? (
        <FlagIconSolid className="w-5 h-5 text-red-500" />
      ) : (
        <FlagIconOutlined className="w-5 h-5 text-red-300 " />
      )}
    </Button>
  );
}

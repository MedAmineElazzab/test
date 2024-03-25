import { Button, SaveIconOutlined, SaveIconSolid } from "@/components";
import { clsx } from "@mantine/core";
import { useState } from "react";

interface SaveButtonProps {
  onClick?: (isBookmarked: boolean) => void;
  isBookmarked: boolean;
}
export function SaveButton(props: SaveButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(props.isBookmarked);
  const classNames = clsx({
    "p-2 w-fit rounded flex bg-white transition-colors shadow-save-btn text-primary-normal hover:shadow-save-btn-hoverd justify-center items-center hover:bg-primary-normal hover:text-white":
      true,
    " text-primary-normal": isBookmarked === true,
  });
  return (
    <Button
      onClick={() => {
        setIsBookmarked(!isBookmarked);
        props?.onClick?.(isBookmarked);
      }}
      className={classNames}
    >
      {isBookmarked ? (
        <SaveIconSolid className="w-5 h-5" />
      ) : (
        <SaveIconOutlined className="w-5 h-5" />
      )}
    </Button>
  );
}

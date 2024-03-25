import { clsx } from "@mantine/core";

interface PaginationChildProps {
  onClick: () => void;
  content: number | "dots";
  active: boolean;
}
export function PaginationChild(props: PaginationChildProps) {
  const classNames = clsx({
    "w-10 h-10 flex items-center text-gray-500 transition-colors cursor-pointer justify-center rounded": true,
    "bg-primary-normal text-white": props.active,
  });
  if (props.content != "dots") {
    return (
      <div className={classNames} onClick={props.onClick}>
        {props.content}
      </div>
    );
  } else {
    return <div className={classNames}>...</div>;
  }
}

import { CheckIcon, EyeOpenedIcon } from "@/components";
import { ViewStates } from "@/services/types";
import { clsx } from "@mantine/core";

interface StatusProps {
  status: ViewStates;
}

export function ViewState(props: StatusProps) {
  let Icon: JSX.Element | null = null;

  switch (props.status) {
    case "viewed":
      Icon = <EyeOpenedIcon className="w-4 h-4" />;
      break;
    case "completed":
      Icon = <CheckIcon className="w-4 h-4" />;
      break;
    case "inProgress":
      Icon = <EyeOpenedIcon className="w-4 h-4" />;
      break;
  }

  const classNames = clsx({
    "w-5 h-5 rounded-full flex justify-center items-center text-white ": true,
    "bg-orange-500": props.status === "viewed" || props.status === "inProgress",
    "bg-green-500": props.status === "completed",
  });

  return Icon ? <div className={classNames}>{Icon}</div> : null;
}

import { accountUser } from "@/@types";
import { Avatar, DropDownArrowIcon } from "@/components";
import { TitleAbbreviation } from "@/enum";
import { clsx } from "@mantine/core";

interface DashboardMenuTargetProps {
  opened: boolean;
  user: accountUser;
}

export function DashboardMenuTarget({
  opened,
  user,
}: DashboardMenuTargetProps) {
  const avatarClassnames = clsx("transition-all rounded-full", {
    "ring-4": opened === true,
  });

  const arrowClassnames = clsx(
    "relative w-5 h-5 flex items-center justify-center transition-all",
    {
      "rotate-180": opened === true,
    }
  );
  return (
    <div className="flex gap-4 justify-between items-center">
      <div className={avatarClassnames}>
        <Avatar radius="full" color="primary" size="lg" src={user.imagePath}>
          {user.firstName != "" && user.lastName != ""
            ? user.firstName[0] + user.lastName[0]
            : ""}
        </Avatar>
      </div>
      <div className="relative flex flex-col max-w-f-97">
        <h2 className="text-gray-700 max-w-full truncate text-sm capitalize font-semibold">
          {user.titleName && TitleAbbreviation[user.titleName]}
          {`${user.firstName} ${user.lastName}`}
        </h2>
        <div className="profession text-gray-500 max-w-full text-sm truncate">
          {user.professionName}
        </div>
      </div>
      <div className={arrowClassnames}>
        <DropDownArrowIcon className="text-gray-500 w-3 h-3" />
      </div>
    </div>
  );
}

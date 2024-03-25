import { clsx } from "@mantine/core";
import { FollowUser } from "..";
import { useState } from "react";
import { UserFollowed } from "../icons/sources/userFollowed";

interface FollowProps {
  isFollowed?: boolean;
  className?: string;
  onHover?: boolean;
}

export const Follow: React.FC<FollowProps> = ({
  isFollowed = false,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const classNames = clsx({
    "border-[1px] border-solid border-[#0049E0] bg-[#0049E0] ":
      isHovered || isFollowed,
    "border-[1px] border-solid border-[#0049E0]": !isFollowed || !isHovered,
  });
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`  cursor-pointer flex w-[120px] items-center gap-2 px-6 h-9  rounded-[4px] py-2 ${classNames}`}
    >
      {" "}
      {!isFollowed ? (
        <FollowUser color={isFollowed || isHovered ? "white" : "#0049E0"} />
      ) : (
        <UserFollowed color={isFollowed || isHovered ? "white" : "#0049E0"} />
      )}
      <span
        style={
          isFollowed || isHovered ? { color: "white" } : { color: "#0049E0" }
        }
        className="text-sm font-[600] leading-5"
      >
        Suivre
      </span>
    </div>
  );
};

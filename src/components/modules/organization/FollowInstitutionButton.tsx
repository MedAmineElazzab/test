import { FOLLOW, FOLLOWED } from "@/common/constants";
import {
  Button,
  UserCheckIcon,
  UserCloseIcon,
  UserPlusIcon,
} from "@/components";
import { clsx } from "@mantine/core";
import { useEffect, useState } from "react";

interface FollowInstitutionButtonProps {
  id: number | string;
  onClick: (isFollowed: boolean) => void;
  isFollowed: boolean;
  type?: "icon-only";
}

export function FollowInstitutionButton(props: FollowInstitutionButtonProps) {
  const [isFollowed, setIsFollowed] = useState<boolean>(props.isFollowed);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    setIsFollowed(props.isFollowed || false);
    return () => setIsFollowed(false);
  }, [props.id]);

  const handleButtonClick = () => {
    props.onClick(!isFollowed);
    setIsFollowed(!isFollowed);
  };

  const buttonClassname = clsx({
    "hovered-class": isHovered,
    "w-9 p-0": props.type === "icon-only",
    "w-32": !props.type,
    "pointer-events-none": !isHovered,
  });

  const containerClassnames = clsx("h-9", {
    "w-9": props.type === "icon-only",
    "w-32": props.type !== "icon-only",
  });
  const buttonProps = {
    onClick: handleButtonClick,
    className: buttonClassname,
  };

  const followButton =
    props.type === "icon-only" ? (
      <Button {...buttonProps} color="primary" variant="outline">
        <UserPlusIcon className="text-primary-normal" />{" "}
      </Button>
    ) : (
      <Button
        {...buttonProps}
        color="primary"
        variant="outline"
        leftIcon={<UserPlusIcon className="text-primary-normal" />}
      >
        {FOLLOW}
      </Button>
    );

  const followedButton =
    props.type === "icon-only" ? (
      <Button {...buttonProps} color="primary" variant="filled">
        <UserCheckIcon className="text-white" />
      </Button>
    ) : (
      <Button
        {...buttonProps}
        color="primary"
        variant="filled"
        leftIcon={<UserCheckIcon className="text-white" />}
      >
        {FOLLOWED}
      </Button>
    );

  const closeButton = (
    <Button {...buttonProps} color="danger" variant="filled">
      <UserCloseIcon className="text-white" />
    </Button>
  );

  return (
    <div
      className={containerClassnames}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isFollowed && !isHovered && followButton}
      {!isFollowed && isHovered && followedButton}
      {isFollowed && !isHovered && followedButton}
      {isFollowed && isHovered && closeButton}
    </div>
  );
}

import { Expert } from "@/api";
import { FOLLOWERS } from "@/common/constants";
import {
  Avatar,
  AvatarGroup,
  Divider,
  FollowExpertButton,
  Link,
} from "@/components";
import { ModulesPathnames } from "@/enum";
import { handleFollowing } from "@/services";
import { useState } from "react";

interface ExpertCardProps
  extends Pick<
    Expert,
    | "id"
    | "imagePath"
    | "firstName"
    | "lastName"
    | "note"
    | "topFollowers"
    | "isFollowed"
    | "country"
    | "followersCount"
    | "slug"
  > {}

export function ExpertCard({
  followersCount,
  firstName,
  id,
  imagePath,
  lastName,
  note,
  topFollowers,
  isFollowed,
  country,
  slug,
}: ExpertCardProps) {
  const [followersNum, setFollowersNum] = useState<number>(followersCount || 0);
  const handleFollowClick = async (isFollowed: boolean) => {
    await handleFollowing(id, isFollowed);
    setFollowersNum(isFollowed ? followersNum + 1 : followersNum - 1);
  };
  return (
    <div className="flex h-fit flex-col bg-white rounded-lg p-4 items-center gap-6 hover:shadow-card transition-all">
      <Avatar
        size="3xl"
        src={imagePath}
        radius="full"
        color="primary"
        withBorder
        withShadow
      >
        {firstName != null &&
          lastName != null &&
          firstName.length > 0 &&
          lastName.length > 0 &&
          firstName.slice(0, 1) + lastName.slice(0, 1)}
      </Avatar>
      <div className="flex flex-col gap-1 text-center justify-center items-center">
        <Link
          href={ModulesPathnames.EXPERT + "/" + slug}
          className="text-gray-900 text-base font-bold leading-5"
        >
          {`${firstName} ${lastName}`}
        </Link>
        <p className="text-gray-600 text-xs font-normal leading-4 max-w-[90%] line-clamp-2">
          {note}
        </p>
      </div>
      <div className="flex items-center gap-2 min-h-5">
        {country && (
          <>
            <img className="w-5 h-5 rounded-full" src={country.flag} alt="" />
            <span className="text-sm text-gray-500 leading-5 font-normal">
              {country.name_fr}
            </span>
          </>
        )}
      </div>

      <div className="w-full flex flex-col gap-4">
        <Divider className="w-full opacity-30" orientation="horizontal" h={1} />
        <div className="w-full flex justify-between items-center ">
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-900">
              <span>{followersNum}</span>
              <span className="text-gray-500">{FOLLOWERS}</span>
              <AvatarGroup>
                {topFollowers.map((follower, index) => {
                  let { firstName, lastName } = follower;
                  return (
                    <Avatar
                      key={firstName + lastName + index}
                      src={follower.imagePath}
                      color="primary"
                      radius="xl"
                      size="sm"
                    >
                      {firstName != null &&
                        lastName != null &&
                        firstName.length > 0 &&
                        lastName.length > 0 &&
                        firstName.slice(0, 1) + lastName.slice(0, 1)}
                    </Avatar>
                  );
                })}
              </AvatarGroup>
            </div>
          </div>
          <div>
            <FollowExpertButton
              id={id}
              isFollowed={isFollowed}
              onClick={handleFollowClick}
              type="icon-only"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Organization } from "@/api";
import {
  Avatar,
  AvatarGroup,
  Divider,
  FollowInstitutionButton,
  Link,
} from "@/components";
import { ModulesPathnames } from "@/enum";
import { handleFollowingInstitution } from "@/services";
import { useState } from "react";

interface InstitutionCardProps
  extends Pick<
    Organization,
    | "id"
    | "imagePath"
    | "name"
    | "note"
    | "topFollowers"
    | "isFollowed"
    | "country"
    | "followersCount"
    | "slug"
    | "abbreviation"
  > {}

export function InstitutionCard({
  country,
  followersCount,
  id,
  imagePath,
  isFollowed,
  name,
  note,
  slug,
  topFollowers,
  abbreviation,
}: InstitutionCardProps) {
  const [followersNum, setFollowersNum] = useState<number>(followersCount || 0);
  const handleFollowClick = async (isFollowed: boolean) => {
    await handleFollowingInstitution(id, isFollowed);
    setFollowersNum(isFollowed ? followersCount + 1 : followersCount - 1);
  };
  return (
    <div className="flex h-fit flex-col bg-white rounded-lg p-4 items-center gap-6 shadow-expert-card hover:shadow-card">
      <Avatar
        size="3xl"
        src={imagePath}
        radius="full"
        color="primary"
        withBorder
        withShadow
      >
        {abbreviation}
      </Avatar>
      <div className="flex flex-col gap-1 text-center justify-center items-center">
        <Link
          href={ModulesPathnames.INSTITUTION + "/" + slug}
          className="text-gray-900 text-base font-bold leading-5 line-clamp-2 min-h-10"
        >
          {name}
        </Link>
        <p className="text-gray-600 text-xs font-normal leading-4   line-clamp-2">
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
              <span className="text-gray-500">Abonnés</span>
              <AvatarGroup>
                {topFollowers.map((follower, index) => {
                  let { imagePath, firstName, lastName } = follower;
                  return (
                    <Avatar
                      key={index}
                      src={imagePath}
                      color="primary"
                      radius="xl"
                      size="sm"
                    >
                      {firstName != null &&
                      firstName.length > 0 &&
                      lastName != null &&
                      lastName.length > 0
                        ? firstName[0] + lastName[0]
                        : ""}
                    </Avatar>
                  );
                })}
              </AvatarGroup>
            </div>
          </div>
          <div>
            <FollowInstitutionButton
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

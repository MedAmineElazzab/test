import { Organization } from "@/api";
import { FOLLOWERS, OPINION } from "@/common/constants";
import {
  Avatar,
  AvatarGroup,
  DetailedCardLayout,
  Divider,
  Flex,
  FollowExpertButton,
  Link,
  LinkIcon,
  LinkedInIconSquare,
  TwitterIcon,
} from "@/components";
import { ModulesTitles } from "@/enum";
import { handleFollowing } from "@/services";
import { useState } from "react";

interface InstitutionCardDetailedProps
  extends Pick<
    Organization,
    | "topFollowers"
    | "isFollowed"
    | "note"
    | "imagePath"
    | "id"
    | "linkedin"
    | "website"
  > {
  name: string;
  abrv: string;
  followersCount: number;
  modulesCount: number;
  notesCount: number;
}

export function InstitutionCardDetailed({
  id,
  imagePath,
  abrv,
  name,
  isFollowed,
  note,
  followersCount,
  modulesCount,
  notesCount,
  topFollowers = [],
  linkedin,
  website,
}: InstitutionCardDetailedProps) {
  const [followersNum, setFollowersNum] = useState<number>(followersCount || 0);

  const handleFollowClick = async (isFollowed: boolean) => {
    await handleFollowing(id, isFollowed);
    setFollowersNum(isFollowed ? followersCount + 1 : followersCount - 1);
  };

  return (
    <DetailedCardLayout imagePath={imagePath} abrv={abrv}>
      <Flex direction="column" className="gap-1">
        <h1 className="name text-2xl text-gray-900 font-bold leading-7">
          {name}
        </h1>
        <p className="max-w-[60%] text-sm text-gray-500">{note}</p>
      </Flex>

      <FollowExpertButton
        id={id}
        isFollowed={isFollowed}
        onClick={handleFollowClick}
      />

      <Flex direction="row" align="center" className="gap-2">
        <Flex
          direction="row"
          align="center"
          className="text-sm text-gray-500 gap-1"
        >
          <span className="text-gray-900">{notesCount}</span>
          <span>{OPINION}</span>
        </Flex>
        <Divider orientation="vertical" className="h-3.5 opacity-40 w-0.5" />
        <Flex
          direction="row"
          align="center"
          className="text-sm text-gray-500 gap-1"
        >
          <span className="text-gray-900">{modulesCount}</span>
          <span>{ModulesTitles.MODULES}</span>
        </Flex>
        <Divider orientation="vertical" className="h-3.5 opacity-40 w-0.5" />
        <Flex direction="row" align="center" className="gap-1">
          <Flex
            direction="row"
            align="center"
            className="text-sm text-gray-500 gap-1"
          >
            <span className="text-gray-900">{followersNum}</span>
            <span>{FOLLOWERS}</span>
          </Flex>
          <AvatarGroup>
            {topFollowers.map((follower, index) => {
              const { firstName, lastName } = follower;
              return (
                <Avatar
                  key={follower.firstName + follower.lastName + index}
                  src={follower.imagePath}
                  color="primary"
                  radius="xl"
                  size="sm"
                >
                  {firstName != null &&
                  lastName != null &&
                  lastName.length > 0 &&
                  firstName.length > 0
                    ? `${firstName[0]}${lastName[0]}`
                    : ""}
                </Avatar>
              );
            })}
          </AvatarGroup>
        </Flex>
      </Flex>

      <Flex direction="row" align="center" className="gap-6 text-gray-400">
        <Link href="#">
          <TwitterIcon className="w-6 h-6" />
        </Link>

        <Link href={`https://linkedin.com${linkedin}`}>
          <LinkedInIconSquare className="w-6 h-6" />
        </Link>

        <Link href={website.includes("://") ? website : `http://${website}`}>
          <LinkIcon className="w-6 h-6" />
        </Link>
      </Flex>
    </DetailedCardLayout>
  );
}

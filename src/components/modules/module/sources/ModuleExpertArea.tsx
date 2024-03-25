import {
  Avatar,
  FollowExpertButton,
  Link,
  SectionCardLayout
} from "@/components";
import { ModuleTitles, ModulesPathnames } from "@/enum";
import { handleFollowing } from "@/services";
import { Expert } from "@/services/types";

interface ModuleExpertArea extends Expert {
  isFollowed: boolean;
}
export function ModuleExpertArea(props: ModuleExpertArea) {
  const abrv =
    props.firstName &&
    props.firstName != "" &&
    props.lastName &&
    props.lastName != ""
      ? props.firstName[0] + props.lastName[0]
      : "";
  const handleFollowingClick = (isFollowed: boolean) => {
    handleFollowing(props.id, isFollowed);
  };
  return (
    <SectionCardLayout title={ModuleTitles.EXPERT}>
      <div className="flex items-center gap-3">
        <Avatar color="primary" size="xl" radius={"full"} src={props.imagePath}>
          {abrv}
        </Avatar>
        <div className="details flex flex-col gap-1">
          <Link
            href={ModulesPathnames.EXPERT + "/" + props.slug}
            className="fullName text-sm text-gray-700 font-semibold"
          >
            {props.firstName + " " + props.lastName}
          </Link>
          <p className="description text-xs text-gray-500 line-clamp-2">
            {props.note}
          </p>
        </div>
      </div>
      <FollowExpertButton
        id={props.id}
        isFollowed={props.isFollowed}
        onClick={handleFollowingClick}
      />
    </SectionCardLayout>
  );
}
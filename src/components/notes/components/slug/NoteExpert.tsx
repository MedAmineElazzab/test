import { NoteExpertType } from "@/api";
import {
  AudioPlayer,
  Avatar,
  FollowExpertButton,
  Link,
  SectionCardLayout,
  Text,
} from "@/components";
import { BACKEND_ROUTES, ModulesPathnames } from "@/enum";
import { FullPath } from "@/lib";
import { handleFollowing } from "@/services";
type Props = {
  NoteExpert: NoteExpertType;
  isFollowed: boolean;
};
export function NoteExpert({ NoteExpert, isFollowed }: Props) {
  const { firstName, lastName } = NoteExpert.expert;
  const abbrv =
    firstName && firstName != "" && lastName && lastName != ""
      ? lastName[0] + firstName[0]
      : "";
  const handleFollowExpert = (isFollowed: boolean) => {
    handleFollowing(NoteExpert.expert.id, isFollowed);
  };
  return (
    <SectionCardLayout title="Expert">
      <div className="flex items-center gap-3">
        <Avatar
          color="primary"
          size="xl"
          radius="full"
          src={NoteExpert.imagePath}
        >
          <Text size={"xl"}>{abbrv}</Text>
        </Avatar>
        <div className="details flex flex-col gap-1">
          <Link
            href={ModulesPathnames.EXPERT + "/" + NoteExpert.expert.slug}
            className="fullName text-sm text-gray-700 font-semibold"
          >
            {`${firstName} ${lastName}`}
          </Link>
          <p className="description text-xs text-gray-500 line-clamp-2 ">
            {NoteExpert.expert.note}
          </p>
        </div>
      </div>
      <FollowExpertButton
        id={NoteExpert.expert.id}
        isFollowed={isFollowed}
        onClick={handleFollowExpert}
      />
      <div className="relative h-36 overflow-hidden rounded-md">
        <AudioPlayer
          src={FullPath(BACKEND_ROUTES.AUDIO + "/" + NoteExpert.audioSrc)}
          placeholder={FullPath(NoteExpert.imagePath)}
          withControl
        />
      </div>
    </SectionCardLayout>
  );
}
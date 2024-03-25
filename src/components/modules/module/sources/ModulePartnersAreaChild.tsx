import { Organization } from "@/api";
import { Avatar, Link, Text } from "@/components";
import { ModulesPathnames } from "@/enum";

interface PartnersAreaChildProps extends Organization {}
export function PartnersAreaChild(props: PartnersAreaChildProps) {
  const Abrv =
    props.abbreviation != null && props.abbreviation.length > 0
      ? props.abbreviation.slice(0, 3)
      : "";
  return (
    <div className="flex items-center gap-3 py-2 px-4 transition-colors hover:bg-gray-50 rounded-md">
      <Avatar
        size="lg"
        radius={"full"}
        color="primary"
        src={props.imagePath}
        verified={props.isMarked}
      >
        {Abrv}
      </Avatar>
      <Text
        size={"sm"}
        className="text-gray-900 font-semibold flex items-center gap-1 line-clamp-2"
      >
        <Link
          href={ModulesPathnames.INSTITUTION + "/" + props.slug}
          className="line-clamp-2 w-f-20"
        >
          {props.name}
        </Link>
      </Text>
    </div>
  );
}

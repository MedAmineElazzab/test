import { Organization } from "@/api";
import { Avatar, Link } from "@/components";
import { ModulesPathnames } from "@/enum";

interface ModulePartnerProps extends Organization {}
export function ModulePartner(props: ModulePartnerProps) {
  const Abbreviation =
    props.abbreviation && props.abbreviation != ""
      ? props.abbreviation.slice(0, 2)
      : "";

  return (
    <div>
      <div className="flex items-center gap-2 max-w-full" key={props.id}>
        <Avatar
          color="primary"
          radius="xl"
          verified={props.isMarked}
          src={props.imagePath}
        >
          {Abbreviation}
        </Avatar>
        <Link
          className="truncate hover:underline text-sm font-semibold w-fit max-w-14"
          href={`${ModulesPathnames.INSTITUTION}/${props.id}`}
        >
          {props.abbreviation}
        </Link>
      </div>
    </div>
  );
}

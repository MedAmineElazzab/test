import { RichTextDisplayer } from "@/components";
import { Wording } from "@/lib";

interface OrganizationDescriptionProps {
  description: string;
}
export function OrganizationDescription(props: OrganizationDescriptionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="description-area bg-gray-50 p-8 gap-4 flex flex-col">
        <h2 className="text-gray-900 font-semibold texts-base">
          {Wording.org_description}
        </h2>
        <RichTextDisplayer
          className="text-gray-500 text-sm leading-8"
          dangerouslySetInnerHTML={{
            __html: props.description,
          }}
        />
      </div>
    </div>
  );
}

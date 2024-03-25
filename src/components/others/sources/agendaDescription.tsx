import { RichTextDisplayer } from "@/components";
import { Wording } from "@/lib";

interface AgendaDescriptionProps {
  description: string;
}
export function AgendaDescription(props: AgendaDescriptionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="description-area bg-gray-50 p-8 gap-4 flex flex-col">
        <h2 className="text-gray-900 font-semibold texts-base">
          {Wording.descriptionAgenda}
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

import { RichTextDisplayer, Text } from "@/components";
import { NoteTypeFields } from "@/enum";
import { FieldType } from "@/hooks";

export function NoteDetailsField(props: FieldType) {
  let fieldName = NoteTypeFields[props.name];
  let value = props.value;
  if (value) {
    return (
      <div className="flex flex-col gap-4">
        <Text className="text-black font-semibold text-base">{fieldName}&nbsp;:</Text>
        <RichTextDisplayer
          className="leading-6 text-base font-normal text-justify text-[#667085]"
          dangerouslySetInnerHTML={{
            __html: value,
          }}
        />
      </div>
    );
  } else
    return (
      <div className="flex flex-col gap-4">
        <Text className="text-black font-semibold text-base">{fieldName}&nbsp;:</Text>
        <p className="leading-6 text-base font-normal text-justify text-[#667085]">
          {"........"}
        </p>
      </div>
    );
}

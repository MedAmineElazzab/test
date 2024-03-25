import { NewDateIcon } from "@/components";
import {
  DatePickerInput,
  DatePickerInputProps,
  DatesProvider,
} from "@mantine/dates";
import "dayjs/locale/fr";

interface DateInputRangeProps
  extends Omit<DatePickerInputProps, "onChange" | "defaultValue"> {
  onChange: (startDate: string | null, endDate: string | null) => void;
  placeholder: string;
  defaultValue: Date[] | undefined;
}

export function DateInputRange(props: DateInputRangeProps) {
  return (
    <DatesProvider settings={{ locale: "fr" }}>
      <DatePickerInput
        classNames={{
          input: "p-2.5  text-base focus:border-primary-normal focus:shadow-input focus:rounded",
        }}
        styles={{
          day: {
            ["&[data-selected=true]"]: {
              backgroundColor: "#0049e0 !important",
              borderColor: "#0049e0 !important",
            },
            ["&[data-in-range=true]"]: {
              backgroundColor: "#0049e010",
              ["&:hover"]: {
                backgroundColor: "#0049e020",
              },
            },
          },
        }}
        icon={<NewDateIcon className="w-5 h-5 text-gray-400" />}
        type="range"
        {...props}
        onChange={(val: Date[]) => {
          if (Array.isArray(val) && val.length === 2) {
            props.onChange(
              val[0]?.toDateString() ?? null,
              val[1]?.toDateString() ?? null
            );
          }
        }}
        defaultValue={props.defaultValue}
      />
    </DatesProvider>
  );
}

import { NewDateIcon } from "@/components";
import {
  DateInput as DateInputMantine,
  DateInputProps as DateInputMantineProps,
  DatesProvider,
} from "@mantine/dates";
import "dayjs/locale/fr";
interface DateInputProps extends DateInputMantineProps {}
export function DateInput(props: DateInputProps) {
  return (
    <DatesProvider settings={{ locale: "fr" }}>
      <DateInputMantine
        icon={<NewDateIcon className="w-5 h-5  text-gray-400" />}
        classNames={{
          input:
            "py-5.5 px-4 overflow-hidden shadow-header-module-single focus:border-primary-normal focus:shadow-input focus:rounded",
          label: "text-current mb-1.5",
        }}
        styles={{
          input: {
            ["&[data-invalid='true']"]: {
              background: "#ffe0e0",
            },
          },
          day: {
            ["&[data-selected=true]"]: {
              backgroundColor: "#0049e0 !important",
              borderColor: "#0049e0 !important",
            },
          },
        }}
        {...props}
      />
    </DatesProvider>
  );
}

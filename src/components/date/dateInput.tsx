import { DateInput as DateInputMantine, DateValue } from "@mantine/dates";
import SelectArrow from "@/_v1/icons/sources/SelectArrow";
import { FC } from "react";

// Import statements

// Import statements

interface InputDateProps extends React.ComponentProps<typeof DateInputMantine> {
  value?: DateValue;
  onChange?: (value: DateValue) => void;
  error?: string;
  alt?: string;
  sx?: any; // Adjust the type according to your needs
  className?: string;
}

export function InputDate({
  value,
  onChange,
  error,
  alt,
  sx,
  className,
  ...props
}: InputDateProps) {
  const selectArrow = <SelectArrow />;

  return (
    <DateInputMantine
      className={className}
      valueFormat="DD/MM/YYYY HH:mm:ss"
      rightSection={selectArrow}
      value={value}
      onChange={onChange}
      sx={{
        input: {
          padding: "22px 10px",
          overflow: "hidden",
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          paddingRight:"36px!important"
        },
        [".mantine-Input-input:focus"]: {
          boxShadow: "0px 0px 0px 4px #E6EDFC!important",
          borderColor: "#5485EA!important ",
          borderRadius: "4px",
        },
        [".mantine-Input-icon mantine-DateInput-icon"]: {
            width:"43px!important"
        }
      }}
      error={
        error !== undefined ? (
          <div className="w-full text-[#F04438] font-normal text-sm pt-1">
            {error}
          </div>
        ) : null
      }
      {...props} // Pass all props to DateInputMantine
    />
  );
}

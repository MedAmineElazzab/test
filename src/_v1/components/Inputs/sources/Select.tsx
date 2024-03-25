import { InfoIcon } from "@/_v1/icons";
import CheckIcon from "@/_v1/icons/sources/CheckIcon";
import SelectArrow from "@/_v1/icons/sources/SelectArrow";
import { Select as SelectM, SelectProps } from "@mantine/core";

interface CustomSelectProps extends SelectProps {
  borderless?: string | boolean;
  selectedValue?: string;
}

export default function Select({
  value,
  onChange,
  defaultValue,
  selectedValue,
  ...props
}: CustomSelectProps) {
  const selectArrow = <SelectArrow />;

  return (
    <>
      <SelectM
        {...props}
        onChange={onChange}

        rightSection={selectArrow}
        defaultValue={value || defaultValue || undefined}
        className={`${props.error != undefined ? "Input-errored" : ""} `.concat(
          String(props.className || "")
        )}
        styles={{
          rightSection: { pointerEvents: "none", transition: ".2s" },
          root: { overflow: "hidden" },
          dropdown: {
            // borderColor: "#0049e0",
            padding: "0px!important",
            margin: "0px",
            width: "100%",
          },
          input: {
            fontSize: "15px",
            paddingLeft: "2.8rem !important",
          },
          icon: {
            width: "2.8rem",
          },
          item: {
            fontSize: "14px",
          },

          ...props.styles,
        }}
        nothingFound={
          <div className="flex justify-center items-center">
            <span>Nothing found</span>
          </div>
        }
        sx={{
          input: {
            color: "#484f59",
            border: props.borderless ? "none" : "",
            padding: "22px 10px",
            overflow: "hidden",
            paddingRight:"36px!important"
          },
          [".mantine-Select-item"]: {
            color: "#101828",
            fontSize: "16px",
          },
          [".mantine-Select-item[data-selected='true']"]: {
            position: "relative",
            fontWeight: 500,
            color: "#101828",
            lineHeight: "24px",
            backgroundColor: "#F9FAFB",
          },
          [".mantine-Select-item[data-selected='true']:after"]: {
            content: '"✓"',
            position: "absolute",
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "22px",
            background: `url('path/to/your/check-icon.svg')`,
            color: "blue",
            backgroundSize: "cover",
          },
          [".mantine-Select-item[data-selected='true']:hover"]: {
            color: "#101828",
            fontWeight: 400,
            backgroundColor: "#F9FAFB",
          },
          [".mantine-Select-item:hover"]: {
            backgroundColor: "#F9FAFB",
          },
          [".mantine-Select-rightSection"]: {
            // background:  "#fff",
            height: "calc(100% - 2px)",
            top: "1px",
            right: "1px",
            borderRadius: "10px",
          },
          [".mantine-Select-rightSection svg"]: {
            transition: ".2s",
            width: "23px !important",
            height: "23px !important",
          },
          ["div[aria-expanded='true'] .mantine-Select-rightSection svg"]: {
            transform: "rotate(180deg)",
          },
          ["input[data-invalid='true']"]: {
            background: "#ffe0e0",
          },
          ["input[data-invalid='true' ~  .mantine-Select-rightSection "]: {
            background: "#ffe0e0",
          },
          ["input:focus"]: {
            borderColor: "#0049e0",
          },
          // [".mantine-Select-item"]: {
          //   transition: ".4s all",
          //   fontSize: "15px",
          // },

          [".mantine-Select-itemsWrapper"]: {
            gap: "4px",
          },
          label: {
            color: "currentcolor",
            marginBottom: "5px",
          },
          ...props.sx,
        }}
        transitionProps={{
          transition: "fade",
          duration: 80,
          timingFunction: "ease",
        }}
        error={
          props.error != undefined ? (
            <div className="flex items-center gap-1">
              <InfoIcon className="w-[13px]" />
              {props.error}
            </div>
          ) : null
        }
      />

      <style>
        {`
          .Input-errored .mantine-Input-icon svg {
            color: #fa5252 !important;
          }
          .Input-errored label {
            color: #fa5252 !important;
          }
          .Input-errored .mantine-Select-rightSection {
            background : transparent !important;
          }
          
        `}
      </style>
    </>
  );
}

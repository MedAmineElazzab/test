import { Box, BoxProps } from "../box";

export function RichTextDisplayer(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        fontSize: "14px !important",
        ["a"]: {
          color: "#0049e0",
        },
        ["p"]: {
          lineHeight: "24px",
        },
        ["a:hover"]: {
          textDecoration: "underline",
        },
        ["ol"]: {
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        },
        ["ol li "]: {
          position: "relative",
          counterIncrement: "list-counter",
          paddingLeft: "30px",
          lineHeight: "24px",
        },
        ["ol li::before "]: {
          position: "absolute",
          top: "1px",
          left: "-3px",
          content: "counter(list-counter)",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          backgroundColor: "#F2F4F7",
          color: "gray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 600,
          fontSize: "13px",
        },
      }}
    />
  );
}
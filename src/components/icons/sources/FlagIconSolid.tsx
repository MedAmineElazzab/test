import { SVGProps } from "react";

export  function FlagIconSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 2.5H10.3183C10.6339 2.5 10.9225 2.67833 11.0637 2.96066L11.6667 4.16667H16.6667C17.1269 4.16667 17.5 4.53977 17.5 5V14.1667C17.5 14.6269 17.1269 15 16.6667 15H11.3483C11.0328 15 10.7442 14.8217 10.603 14.5393L10 13.3333H4.16667V18.3333H2.5V2.5Z"
        fill={"currentColor"}
      />
    </svg>
  );
}

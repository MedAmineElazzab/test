import { SVGProps } from "react";

export  function ActivityFeedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.33331 9.66667L7.99998 13L14.6666 9.66667M7.99998 3L1.33331 6.33333L7.99998 9.66667L14.6666 6.33333L7.99998 3Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

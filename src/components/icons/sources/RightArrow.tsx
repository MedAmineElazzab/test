import { SVGProps } from "react";

export function RightArrow(props: SVGProps<SVGSVGElement>) {
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
        d="M4.16675 9.99999H15.8334M15.8334 9.99999L10.0001 4.16666M15.8334 9.99999L10.0001 15.8333"
        stroke="currentColor"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

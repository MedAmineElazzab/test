import { SVGProps } from "react";

export function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.8333 1.66669L2.5 11.6667H10L9.16667 18.3334L17.5 8.33335H10L10.8333 1.66669Z"
        stroke="#FECC00"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

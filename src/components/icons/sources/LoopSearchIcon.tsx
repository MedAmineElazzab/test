import { SVGProps } from "react";

export function LoopSearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="m14.025 12.847 3.57 3.569-1.18 1.178-3.568-3.569a7.468 7.468 0 0 1-4.681 1.641c-4.14 0-7.5-3.36-7.5-7.5 0-4.14 3.36-7.5 7.5-7.5 4.14 0 7.5 3.36 7.5 7.5 0 1.77-.614 3.397-1.64 4.68Zm-1.672-.619A5.814 5.814 0 0 0 14 8.166a5.832 5.832 0 0 0-5.833-5.833 5.832 5.832 0 0 0-5.833 5.833 5.832 5.832 0 0 0 5.833 5.833c1.58 0 3.012-.627 4.062-1.646l.125-.125Z"
      />
    </svg>
  );
}

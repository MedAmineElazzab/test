import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19 19"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.438}
      d="M6.625 6.625h5.75M6.625 9.5h5.75M6.625 12.375H9.5M12.077 17.406H2.313a.719.719 0 0 1-.72-.718V2.313a.719.719 0 0 1 .72-.72h14.374a.719.719 0 0 1 .72.72v9.764a.715.715 0 0 1-.211.508l-4.61 4.61a.717.717 0 0 1-.509.211Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.438}
      d="M17.341 12.374h-4.966v4.967"
    />
  </svg>
);
export default SvgComponent;

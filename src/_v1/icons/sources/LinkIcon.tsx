import * as React from "react";
import { SVGProps } from "react";
const LinkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M8.208 11.831a.594.594 0 0 1 0 .84l-.737.742a4.159 4.159 0 0 1-5.88-5.884l1.79-1.79a4.156 4.156 0 0 1 5.701-.17.595.595 0 0 1-.79.892 2.969 2.969 0 0 0-4.07.12L2.431 8.37a2.97 2.97 0 1 0 4.199 4.2l.737-.738a.594.594 0 0 1 .84 0ZM13.41 1.589a4.162 4.162 0 0 0-5.88 0l-.738.738a.594.594 0 0 0 .84.84l.738-.738a2.97 2.97 0 1 1 4.2 4.2l-1.79 1.79a2.969 2.969 0 0 1-4.072.12.595.595 0 0 0-.79.89 4.156 4.156 0 0 0 5.702-.167l1.79-1.79a4.162 4.162 0 0 0 0-5.882V1.59Z"
    />
  </svg>
);
export default LinkIcon;

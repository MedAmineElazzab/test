import React, { SVGProps } from "react";

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M15.75 15C15.75 15.4142 15.4142 15.75 15 15.75H3C2.58579 15.75 2.25 15.4142 2.25 15V7.1168C2.25 6.88536 2.35685 6.66688 2.53954 6.52479L8.53957 1.85812C8.8104 1.64747 9.1896 1.64747 9.46043 1.85812L15.4604 6.52479C15.6431 6.66688 15.75 6.88536 15.75 7.1168V15ZM14.25 14.25V7.48361L9 3.40028L3.75 7.48361V14.25H14.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

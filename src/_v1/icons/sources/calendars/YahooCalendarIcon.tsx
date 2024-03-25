import * as React from "react";
import { SVGProps } from "react";
const YahooCalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#6001CF"
        d="M0 3.043A3.043 3.043 0 0 1 3.043 0h13.913A3.043 3.043 0 0 1 20 3.043v13.913A3.043 3.043 0 0 1 16.956 20H3.043A3.043 3.043 0 0 1 0 16.956V3.043Z"
      />
      <path
        fill="#fff"
        d="M13.452 4.939a.253.253 0 0 1 .236-.157h1.725a.25.25 0 0 1 .233.345l-1.826 4.49a.251.251 0 0 1-.233.157h-1.722a.251.251 0 0 1-.233-.346l1.82-4.49ZM9.224 7.366 7.9 10.654l-1.282-3.29a.253.253 0 0 0-.235-.16H4.6a.252.252 0 0 0-.233.346l2.4 5.89-.613 1.52a.25.25 0 0 0 .233.35h1.722a.25.25 0 0 0 .233-.157l3.072-7.598a.252.252 0 0 0-.225-.346H9.455a.25.25 0 0 0-.23.157ZM13.396 11.934a1.393 1.393 0 1 1-2.786 0 1.393 1.393 0 0 1 2.786 0Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default YahooCalendarIcon;

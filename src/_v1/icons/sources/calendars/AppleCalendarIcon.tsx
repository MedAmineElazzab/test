import * as React from "react";
import { SVGProps } from "react";
const AppleCalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#FFFCFC"
        d="M4.952 20C1.99 20 0 18.01 0 15.047v-9.38C0 2.703 1.99.713 4.952.713h10.095C18.01.714 20 2.704 20 5.666v9.38C20 18.01 18.01 20 15.047 20H4.952Z"
      />
      <path
        fill="#F4413D"
        d="M0 5.714v-.048C0 2.704 1.99.714 4.952.714h10.095C18.01.714 20 2.704 20 5.666v.048H0Z"
      />
      <path
        fill="#413D3D"
        d="M6.991 11.745h.82c.923 0 1.558-.566 1.558-1.352 0-.762-.576-1.3-1.529-1.3-.874 0-1.494.528-1.567 1.31h-.645C5.711 9.27 6.6 8.507 7.87 8.507c1.24 0 2.173.756 2.173 1.802 0 .884-.572 1.518-1.47 1.68v.019c1.08.063 1.773.732 1.773 1.728 0 1.192-1.065 2.041-2.437 2.041-1.42 0-2.383-.81-2.427-1.938h.645c.053.786.761 1.352 1.777 1.352 1.02 0 1.763-.6 1.763-1.435 0-.899-.693-1.446-1.826-1.446h-.85v-.566ZM13.158 9.328h-.02c-.112.068-1.333.952-1.89 1.299v-.713c.21-.132 1.704-1.186 1.9-1.304h.654v7.056h-.644V9.328Z"
      />
      <path
        fill="#C53431"
        d="M4.643 4.286a1.072 1.072 0 1 0 0-2.143 1.072 1.072 0 0 0 0 2.143ZM15.357 4.286a1.071 1.071 0 1 0 0-2.143 1.071 1.071 0 0 0 0 2.143Z"
      />
      <path
        fill="url(#b)"
        d="M4.642 3.571a.357.357 0 0 1-.357-.357V.357a.357.357 0 1 1 .714 0v2.857c0 .197-.16.357-.357.357Z"
      />
      <path
        fill="url(#c)"
        d="M15.357 3.571A.357.357 0 0 1 15 3.214V.357a.357.357 0 1 1 .713 0v2.857c0 .197-.16.357-.356.357Z"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={10.002}
        x2={10.002}
        y1={20.001}
        y2={0}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#DCDCDC" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={15.357}
        x2={15.357}
        y1={3.571}
        y2={0}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#DCDCDC" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default AppleCalendarIcon;

import React from "react";

export default function GmailIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="30"
      viewBox="0 0 40 30"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_411_5128)">
        <path
          d="M2.72727 30H9.09091V14.5455L0 7.72727V27.2727C0 28.7818 1.22273 30 2.72727 30Z"
          fill="#4285F4"
        />
        <path
          d="M30.9092 30H37.2728C38.7819 30 40.0001 28.7773 40.0001 27.2727V7.72727L30.9092 14.5455"
          fill="#34A853"
        />
        <path
          d="M30.9092 2.72727V14.5455L40.0001 7.72727V4.09091C40.0001 0.718182 36.1501 -1.20455 33.4546 0.818181"
          fill="#FBBC04"
        />
        <path
          d="M9.09082 14.5455V2.72727L19.9999 10.9091L30.909 2.72727V14.5455L19.9999 22.7273"
          fill="#EA4335"
        />
        <path
          d="M0 4.09091V7.72727L9.09091 14.5455V2.72727L6.54545 0.818181C3.84546 -1.20455 0 0.718182 0 4.09091Z"
          fill="#C5221F"
        />
      </g>
      <defs>
        <clipPath id="clip0_411_5128">
          <rect width="40" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

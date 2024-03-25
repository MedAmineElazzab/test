import { SVGProps } from "react";

export default function UploadIconRejected({
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEE4E2" />
      <rect
        x="4"
        y="4"
        width="48"
        height="48"
        rx="24"
        stroke="#FEF3F2"
        strokeWidth="8"
      />
      <path
        d="M29.12 28L35.76 21.36C36.08 21.04 36.08 20.56 35.76 20.24C35.44 19.92 34.96 19.92 34.64 20.24L28 26.88L21.36 20.24C21.04 19.92 20.56 19.92 20.24 20.24C19.92 20.56 19.92 21.04 20.24 21.36L26.88 28L20.24 34.64C19.92 34.96 19.92 35.44 20.24 35.76C20.56 36.08 21.04 36.08 21.36 35.76L28 29.12L34.64 35.76C34.96 36.08 35.44 36.08 35.76 35.76C36.08 35.44 36.08 34.96 35.76 34.64L29.12 28Z"
        fill="#D92D20"
      />
    </svg>
  );
}

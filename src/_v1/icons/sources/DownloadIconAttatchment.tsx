import React from "react";

export default function DownloadIconAttatchment({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="8.68 8.34 22.64 22.64"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.274 9.472c-5.302.372-9.487 4.791-9.487 10.188 0 5.64 4.573 10.212 10.213 10.212 5.64 0 10.213-4.572 10.213-10.212 0-4.82-3.339-8.86-7.83-9.934V8.592c5.107 1.094 8.936 5.633 8.936 11.068 0 6.25-5.067 11.319-11.319 11.319-6.251 0-11.32-5.068-11.32-11.32C8.68 13.41 13.75 8.34 20 8.34c.171 0 .341.004.51.012v1.107h-.016v13.56l4.732-3.996.862.862-5.603 4.868c-.466.466-1.027.496-1.21.312V9.472Zm-.862 12.873v1.553l-4.54-3.9.768-.948 3.772 3.295Z"
        fill="currentColor"
      />
    </svg>
  );
}

import React from "react";

export default function BookMarkedIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 29 29"
      fill="none"
      {...props}
    >
      <circle cx="14.2462" cy="14.2462" r="14.2462" fill="#1DCB24" />
      <path
        opacity="0.15"
        d="M7 7.9C7 6.85066 8.04467 6 9.33333 6H18.6667C19.9554 6 21 6.85066 21 7.9V22.15L14 16.45L7 22.15V7.9Z"
        fill="white"
      />
      <path
        d="M7 8.23529C7 7.00077 8.04467 6 9.33333 6H18.6667C19.9554 6 21 7.00077 21 8.23529V25L14 18.2941L7 25V8.23529Z"
        fill="white"
        stroke="#1DCB24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.9137 10.0855C17.7988 9.97151 17.6123 9.97151 17.4975 10.0855L13.3332 14.222L11.5023 12.4171C11.3875 12.3031 11.201 12.3031 11.0861 12.4171C10.9713 12.531 10.9713 12.7155 11.0861 12.8292L13.126 14.8399C13.2397 14.9524 13.4288 14.9524 13.5425 14.8399L17.9136 10.4976C18.0288 10.3839 18.0288 10.1991 17.9137 10.0855C18.0288 10.1991 17.7988 9.97151 17.9137 10.0855Z"
        fill="#1DCB24"
      />
    </svg>
  );
}

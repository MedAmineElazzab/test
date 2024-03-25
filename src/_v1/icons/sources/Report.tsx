import { SVGProps } from "react";

export default function ReportIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" { ...props }>
      <g strokeWidth="0" />
      <g strokeLinecap="round" strokeLinejoin="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 1a1 1 0 0 0-1 1v20a1 1 0 1 0 2 0v-8h13a1 1 0 0 0 .858-1.514L17.166 8l2.692-4.486A1 1 0 0 0 19 2H6a1 1 0 0 0-1-1Zm1 3v8h11.234l-2.092-3.486a1 1 0 0 1 0-1.028L17.235 4H6Z"
        fill="currentColor"
      />
    </svg>
  );
}

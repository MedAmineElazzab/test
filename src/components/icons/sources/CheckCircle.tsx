
import { SVGProps } from "react";

export function CheckCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="currentColor" opacity={.4} />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.096 7.39016L9.93602 14.3002L8.03602 12.2702C7.68602 11.9402 7.13602 11.9202 6.73602 12.2002C6.34602 12.4902 6.23602 13.0002 6.47602 13.4102L8.72602 17.0702C8.94602 17.4102 9.32601 17.6202 9.75601 17.6202C10.166 17.6202 10.556 17.4102 10.776 17.0702C11.136 16.6002 18.006 8.41016 18.006 8.41016C18.906 7.49016 17.816 6.68016 17.096 7.38016V7.39016Z"
        fill="currentColor"
      />
    </svg>
  );
}

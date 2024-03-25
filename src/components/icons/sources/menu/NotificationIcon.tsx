import { SVGProps } from "react";

export function NotificationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.998 15H19.998V17H-0.00195312V15H1.99805V8C1.99805 3.58172 5.57977 0 9.99805 0C14.4163 0 17.998 3.58172 17.998 8V15ZM15.998 15V8C15.998 4.68629 13.3117 2 9.99805 2C6.68434 2 3.99805 4.68629 3.99805 8V15H15.998ZM6.99805 19H12.998V21H6.99805V19Z"
        fill="currentColor"
      />
    </svg>
  );
}

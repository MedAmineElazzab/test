import React from "react";

export default function FileIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M19.493 9.75C19.4928 9.55509 19.4237 9.36309 19.2803 9.2197L13.2803 3.2197C13.1369 3.07584 12.945 3.00605 12.75 3.00605V3H8.25C6.18239 3 4.5 4.68239 4.5 6.75V17.25C4.5 19.3176 6.18239 21 8.25 21H15.75C17.8176 21 19.5 19.3176 19.5 17.25V9.75H19.493ZM13.5 5.56055L16.9395 9H15.75C14.5093 9 13.5 7.99073 13.5 6.75V5.56055ZM15.75 19.5H8.25C7.00927 19.5 6 18.4907 6 17.25V6.75C6 5.50927 7.00927 4.5 8.25 4.5H12V6.75C12 8.81761 13.6824 10.5 15.75 10.5H18V17.25C18 18.4907 16.9907 19.5 15.75 19.5ZM15.75 16.5C15.75 16.9146 15.4142 17.25 15 17.25H9C8.58581 17.25 8.25 16.9146 8.25 16.5C8.25 16.0854 8.58581 15.75 9 15.75H15C15.4142 15.75 15.75 16.0854 15.75 16.5ZM15.75 13.5C15.75 13.9146 15.4142 14.25 15 14.25H9C8.58581 14.25 8.25 13.9146 8.25 13.5C8.25 13.0854 8.58581 12.75 9 12.75H15C15.4142 12.75 15.75 13.0854 15.75 13.5ZM8.25 10.5C8.25 10.0854 8.58581 9.75 9 9.75H10.5C10.9142 9.75 11.25 10.0854 11.25 10.5C11.25 10.9146 10.9142 11.25 10.5 11.25H9C8.58581 11.25 8.25 10.9146 8.25 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

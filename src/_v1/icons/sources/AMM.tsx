import React from "react";

export default function AMM({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        d="M20.4544 19.383C20.8298 19.1593 20.9527 18.6736 20.729 18.2982C20.5052 17.9228 20.0195 17.7999 19.6441 18.0236L15.4239 20.5389C15.0485 20.7627 14.9256 21.2483 15.1493 21.6237C15.373 21.9991 15.8588 22.1221 16.2342 21.8983L20.4544 19.383Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6042 7.14007C14.9958 6.95747 15.3867 6.834 15.8287 6.834C16.2707 6.834 16.6616 6.95747 17.0532 7.14007C17.4209 7.31153 17.84 7.56073 18.3327 7.8536L21.5183 9.7472C22.0114 10.0403 22.4304 10.2893 22.7582 10.5311C22.9168 10.6482 23.064 10.7705 23.1978 10.9053L25.9403 9.077C26.3039 8.8346 26.7952 8.9328 27.0376 9.29647C27.28 9.66007 27.1818 10.1513 26.8181 10.3937L23.9188 12.3266C23.9394 12.4419 23.9545 12.5594 23.966 12.6796C24.0054 13.0905 24.0054 13.5864 24.0053 14.1741V17.9573C24.0054 18.5449 24.0054 19.0409 23.966 19.4517C23.9243 19.8874 23.8342 20.2883 23.6186 20.6729C23.4023 21.0587 23.1076 21.3423 22.7582 21.6002C22.4304 21.8421 22.0114 22.0911 21.5183 22.3841L18.3327 24.2777C17.8401 24.5706 17.4208 24.8198 17.0532 24.9913C16.6616 25.1739 16.2707 25.2974 15.8287 25.2974C15.3867 25.2974 14.9958 25.1739 14.6042 24.9913C14.2366 24.8198 13.8175 24.5707 13.3249 24.2779L10.139 22.3841C9.64604 22.0911 9.22704 21.8421 8.89924 21.6002C8.74064 21.4832 8.59337 21.3609 8.45957 21.2261L5.71712 23.0544C5.3535 23.2968 4.86221 23.1985 4.6198 22.8349C4.37738 22.4713 4.47564 21.98 4.83926 21.7376L7.73857 19.8047C7.71804 19.6895 7.70284 19.5719 7.69137 19.4517C7.65204 19.0409 7.65204 18.5449 7.65204 17.9573V14.1741C7.65204 13.5864 7.65204 13.0905 7.69137 12.6796C7.70284 12.5594 7.71804 12.4419 7.73857 12.3266L4.83926 10.3937C4.47564 10.1513 4.37738 9.66007 4.6198 9.29647C4.86221 8.9328 5.3535 8.8346 5.71712 9.077L8.45957 10.9053C8.59337 10.7705 8.74064 10.6482 8.89924 10.5311C9.22704 10.2893 9.64604 10.0403 10.1391 9.7472L13.3247 7.8536C13.8174 7.56073 14.2365 7.31153 14.6042 7.14007ZM15.2731 8.57433C14.9858 8.70833 14.6348 8.91593 14.101 9.2332L10.9796 11.0886C10.446 11.4057 10.0957 11.6151 9.8389 11.8046C9.59677 11.9833 9.48844 12.1089 9.41917 12.2325C9.34917 12.3573 9.29644 12.5203 9.2667 12.8304C9.23544 13.157 9.23464 13.5768 9.23464 14.2103V17.9211C9.23464 18.5545 9.23544 18.9744 9.2667 19.3009C9.29644 19.6111 9.34917 19.7741 9.41917 19.8989C9.48844 20.0225 9.59677 20.1481 9.8389 20.3268C10.0957 20.5163 10.446 20.7256 10.9796 21.0427L14.101 22.8982C14.6348 23.2155 14.9858 23.423 15.2731 23.557C15.5446 23.6837 15.6994 23.7148 15.8287 23.7148C15.958 23.7148 16.1128 23.6837 16.3842 23.557C16.6716 23.423 17.0226 23.2155 17.5564 22.8982L20.6778 21.0427C21.2113 20.7256 21.5617 20.5163 21.8185 20.3268C22.0606 20.1481 22.1689 20.0225 22.2382 19.8989C22.3082 19.7741 22.361 19.6111 22.3906 19.3009C22.4219 18.9744 22.4228 18.5545 22.4228 17.9211V14.2103C22.4228 13.5768 22.4219 13.157 22.3906 12.8304C22.361 12.5203 22.3082 12.3573 22.2382 12.2325C22.1689 12.1089 22.0606 11.9833 21.8185 11.8046C21.5617 11.6151 21.2113 11.4057 20.6778 11.0886L17.5564 9.2332C17.0226 8.91593 16.6716 8.70833 16.3842 8.57433C16.1128 8.44773 15.958 8.41653 15.8287 8.41653C15.6994 8.41653 15.5446 8.44773 15.2731 8.57433Z"
        fill="currentColor"
      />
    </svg>
  );
}

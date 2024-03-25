import React from "react";

export default function CongresScientifiques({
  ...props
}: React.SVGProps<SVGSVGElement>) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.4751 8.61033C27.4751 7.06647 26.2456 5.74241 24.6326 5.7986C23.4316 5.84043 21.8618 5.96537 20.6541 6.32691C19.6042 6.6412 18.4234 7.25507 17.5029 7.7878C16.6398 8.28733 15.5653 8.31227 14.6909 7.84987C13.6406 7.29453 12.2588 6.63622 11.06 6.31987C10.0462 6.05237 8.76397 5.92388 7.72284 5.8599C6.07884 5.75885 4.7915 7.0968 4.7915 8.67847V20.4378C4.7915 22.0586 6.10376 23.324 7.65917 23.4213C8.6707 23.4845 9.80897 23.6062 10.6562 23.8297C11.7034 24.1061 12.9983 24.7205 14.0439 25.2779C15.3451 25.9715 16.9215 25.9715 18.2227 25.2779C19.2682 24.7205 20.5632 24.1061 21.6104 23.8297C22.4576 23.6062 23.5959 23.4845 24.6074 23.4213C26.1628 23.324 27.4751 22.0586 27.4751 20.4378V8.61033ZM24.6877 7.3802C25.3364 7.3576 25.8925 7.8912 25.8925 8.61033V20.4378C25.8925 21.1613 25.2929 21.7927 24.5086 21.8418C23.4746 21.9065 22.2094 22.0349 21.2066 22.2996C19.9719 22.6254 18.5417 23.3145 17.4782 23.8813C17.3008 23.9759 17.115 24.0505 16.9246 24.1049V9.67467C17.4018 9.57913 17.8658 9.40633 18.2956 9.15753C19.1929 8.63827 20.2426 8.10207 21.108 7.843C22.1094 7.5432 23.5073 7.42133 24.6877 7.3802ZM15.342 9.70947C14.862 9.6348 14.3914 9.48173 13.9511 9.24893C12.9205 8.70393 11.6712 8.11793 10.6562 7.85007C9.79924 7.62393 8.64497 7.50213 7.62577 7.43947C6.9569 7.3984 6.37408 7.94293 6.37408 8.67847V20.4378C6.37408 21.1613 6.9737 21.7927 7.75797 21.8418C8.79197 21.9065 10.0572 22.0349 11.06 22.2996C12.2947 22.6254 13.7249 23.3145 14.7883 23.8813C14.9658 23.9759 15.1516 24.0505 15.342 24.1049V9.70947Z"
        fill="currentColor"
      />
    </svg>
  );
}

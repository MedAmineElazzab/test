import { SVGProps } from "react";

export default function Master({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 37 50"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7578 13.985C17.7051 13.0721 19.896 13.0721 21.8433 13.985L29.8727 17.7494C31.1355 18.3414 31.7006 19.6269 31.7006 20.8003C31.7006 21.9737 31.1355 23.2593 29.8727 23.8513L28.1006 24.6821V30.5508C28.1006 32.0544 27.3468 33.5062 25.9743 34.2663C25.0722 34.7659 23.8867 35.3673 22.6392 35.8458C21.4065 36.3188 20.0413 36.7003 18.8006 36.7003C17.5599 36.7003 16.1949 36.3188 14.962 35.8458C13.7145 35.3673 12.5291 34.7659 11.627 34.2663C10.2545 33.5062 9.50065 32.0544 9.50065 30.5508V24.682L7.72851 23.8512L7.70063 23.838V27.4003C7.70063 27.8973 7.29769 28.3003 6.80063 28.3003C6.30358 28.3003 5.90063 27.8973 5.90063 27.4003V20.8003C5.90063 19.6269 6.46577 18.3414 7.72852 17.7493L15.7578 13.985ZM11.3007 25.5259V30.5508C11.3007 31.4664 11.7551 32.2797 12.4991 32.6916C13.359 33.1679 14.4648 33.7272 15.6068 34.1653C16.7634 34.609 17.8861 34.9003 18.8006 34.9003C19.7151 34.9003 20.8378 34.609 21.9945 34.1653C23.1365 33.7272 24.2423 33.1679 25.1022 32.6916C25.8462 32.2797 26.3007 31.4664 26.3007 30.5508V25.526L21.8434 27.6156C19.8962 28.5285 17.7052 28.5285 15.758 27.6156L11.3007 25.5259ZM8.49257 22.2214C8.00878 21.9946 7.70063 21.4536 7.70063 20.8003C7.70063 20.147 8.00879 19.6059 8.49257 19.3791L16.5219 15.6147C17.9851 14.9288 19.6161 14.9288 21.0792 15.6148L29.1087 19.3791C29.5925 19.606 29.9007 20.1471 29.9007 20.8003C29.9007 21.4536 29.5925 21.9947 29.1087 22.2215L21.0794 25.9858C19.6162 26.6718 17.9852 26.6718 16.5221 25.9858L8.49257 22.2214Z"
        fill="currentColor"
      />
    </svg>
  );
}

import { useRouter } from "next/router";
import React, { useEffect, useState, SVGProps } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  initPage: number;
  totalPages: number;
  isDark?: boolean;
  payload: (page: number) => void;
};

type IconProps = {
  withIcon: boolean;
};

export const PrevIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 7 12"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6.516 11.707a.8.8 0 0 1-.58-.227L1.092 6.636a.778.778 0 0 1 0-1.135L5.936.657a.778.778 0 0 1 1.135 0 .778.778 0 0 1 0 1.135L2.807 6.056l4.264 4.289a.778.778 0 0 1 0 1.135.783.783 0 0 1-.555.227Z"
    />
  </svg>
);

export const NextIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 7 12"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M1.073 11.297a.8.8 0 0 1-.58-.227.778.778 0 0 1 0-1.136l4.263-4.289L.492 1.381a.778.778 0 0 1 0-1.135.778.778 0 0 1 1.136 0L6.472 5.09a.778.778 0 0 1 0 1.136L1.628 11.07a.783.783 0 0 1-.555.227Z"
    />
  </svg>
);

const Paginate = ({
  initPage = 1,
  totalPages = 1,
  isDark = false,
  payload
}: Props) => {
  const { query, push, pathname } = useRouter();
  const [page, setPage] = useState(initPage);

  const handlePage = (page: any) => {
    const { nextSelectedPage } = page;

    if (nextSelectedPage !== undefined) {
      const currentPage = nextSelectedPage + 1;
      setPage(nextSelectedPage);
      payload(currentPage);
    }
  };



  const isNext = () => page !== totalPages - 1;
  const isPrev = () => page !== 0;

  const NextButton = ({ withIcon }: IconProps) => {
    return (
      <>
        <div className=" flex gap-[10px] items-center">
          <span>Next</span>
          {/* {withIcon && <NextIcon color="whiteColor" width={5} height={12} />} */}
        </div>
      </>
    );
  };

  const PrevButton = ({ withIcon }: IconProps) => {
    return (
      <>
        <div className=" flex gap-[10px] items-center">
          {/* {withIcon && <PrevIcon color="currentColor" width={5} height={12} />} */}
          <span>Previous</span>
        </div>
      </>
    );
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<NextButton withIcon={!isDark} />}
        previousLabel={<PrevButton withIcon={!isDark} />}
        onClick={(page) => handlePage(page)} //page?.nextSelectedPage
        // onPageChange={(page) => setPage(Number(page.selected))} // setPage(Number(page.selected)
        pageRangeDisplayed={3}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        // initialPage={Number(query?.page) - 1}
        forcePage={Number(query?.page) - 1 || 0}
        // disableInitialCallback={true}
        // Custom Style
        containerClassName="pagination flex gap-[10px] items-center justify-center text-[16px] text-bold h-[32px] w-[100%]"
        pageClassName="w-[32px] h-[32px] flex items-center justify-center"
        activeClassName={`bg-[#0049E0] text-[#FFFFFF] ${
          isDark ? "rounded-full" : "rounded-full"
        }`}
        previousClassName={`
            flex items-center mr-[20px] justify-center h-[32px] bg-[#282C38] rounded-[4px]
            ${
              isDark
                ? "text-[#8C959F] bg-[#282C38] max-w-[85px] w-[100%]"
                : "text-[#5E718D] bg-[#FFFFFF] max-w-[85px] w-[100%] border-[1px]"
            }
          `}
        // ${isPrev() && "!text-[#0057FF]"}
        nextClassName={`
            flex items-center ml-[20px] justify-center h-[32px] rounded-[4px]
            ${
              isDark
                ? "text-[#8C959F] bg-[#282C38] max-w-[85px] w-[100%]"
                : "text-[#5E718D] bg-[#FFFFFF] max-w-[85px] w-[100%] border-[1px]"
            }
          `}
        // ${isNext() && "!text-[#0057FF]"}
        disabledClassName=""
      />
    </>
  );
};

export default Paginate;

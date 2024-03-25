import { setContext } from "@/_v1/api/api";
import React, { Fragment } from "react";
import { GetServerSideProps } from "next";
import { ArrowToDownIcon, DocumentIcon, TagsIcon } from "../_v1/icons";
import { truncate } from "../_v1/functions";
import { DefaultPaginate } from "../_v1/components";
import { SearchBar } from "@/_v1/components/sources/header/partails";

interface Props {
  currentQuery: string;
  currentPage: number;
}

const Page = ({ currentQuery, currentPage }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-[20px] max-w-[1200px] w-[100%] m-auto p-[30px] py-[40px] ">
        <div className="min-h-[65px] w-[100%] bg-[white] p-[15px] border-[1px] border-[#2051E5] rounded-[8px] flex flex-wrap">
          {/* TAGS AREA */}
          <div className="flex flex-wrap">
            <div className="flex gap-[4px] rounded-full h-[36px] border-[1px] border-[#2051E5] justify-center items-center px-[4px] py-[5px] pr-[8px]">
              <div className="w-[26px] h-[26px] bg-[#F5F8FF] border-[1px] border-[#DEE8FF] rounded-full flex justify-center items-center">
                <TagsIcon width={22} height={18} />
              </div>
              <span className="text-[13px] font-bold text-[#2051E5]">
                Dermatologie
              </span>
            </div>
          </div>
          {/* SEARCH AREA */}
          <div className="flex-[1] relative">
            <SearchBar defaultQuery={currentQuery} />
          </div>
        </div>
        <div className="flex flex-col bg-[white] border-[1px] border-[#C3CDD980] rounded-[8px] overflow-hidden">
          {/* FILTER */}
          <div className="border-b-[1px] border-[#DFDFDF] px-[20px] py-[15px] pt-[20px]">
            <div className="flex items-center gap-[4px]">
              <span className="text-[15px] font-bold">Meilleurs matchs</span>
              <ArrowToDownIcon color="black" width={20} height={20} />
            </div>
          </div>
          {/* SEARCH RESULT */}
          <div className="relative mb-[-1px] flex flex-wrap">
            {/* Search Item Here */}
            {new Array(6).fill(0).map((_, index) => (
              <Fragment key={_}>
                <div className="max-w-[50%] w-[100%] flex gap-[15px] px-[20px] py-[30px] border-b-[1px] border-[#DFDFDF] hover:bg-[#0057FF08] cursor-pointer">
                  <div className="w-[38px]">
                    <div className="w-[38px] h-[38px] bg-[#F5F8FF] border-[1px] border-[#DEE8FF] rounded-full flex justify-center items-center">
                      <DocumentIcon
                        color="#0057FF"
                        width={16}
                        height={20}
                        className="relative mr-[-1px]"
                      />
                    </div>
                  </div>
                  <div className="w-[calc(100%-38px)]">
                    <h4 className="text-[#191919] text-[16px] font-bold leading-[1.15em] mb-[4px]">
                      No-code founders are on the rise. Are they making money?
                    </h4>
                    <p className="text-[#191919] text-[15px]">
                      {truncate(`Nov '20 - Enjoy the read? I'm doing a couple of these roundups
                  a week! My aim is to keep ahead of the curve on issues
                  affecting indie hackers and forw`)}
                    </p>
                    <div className="flex flex-wrap gap-[10px] mt-[8px]">
                      <span className="text-[#11A75C] bg-[#11A75C]/10 px-[10px] py-[5px] rounded-[4px] text-[13px] font-bold">
                        Nouveaux médicaments
                      </span>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          {/* PAGINATION */}
          <div className="py-[30px] px-[20px]">
            <DefaultPaginate
              initPage={0}
              totalPages={10}
              isDark={false}
              payload={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  const page = Number(query?.page) || 1;
  const q = String(query?.q) || "";

  // console.log(context);

  return {
    props: { currentQuery: q, currentPage: page },
  };
};

export default Page;

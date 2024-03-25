import api, { setContext } from "@/_v1/api/api";
import { DefaultPaginate, ImageCard, MasterClassCard } from "../../_v1/components";
import { CalendarIcon } from "../../_v1/icons";
// import CalendarIcon from "@/icons/sources/CalendarIcon";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import React, { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { calculateHeight, defineImageURI } from "../../_v1/functions";
import Link from "next/link";
import { getMasterClassesWithPagination } from "@/_v1/services/master-classes";
import { Pagination } from "@mantine/core";
import { GetServerSideProps } from "next";
const Page = ({ classes, currentPage }: any) => {
  const { pathname, query, push } = useRouter();
  const [page, setPage] = useState(currentPage);

  const handleChangePage = (targetPage: number) => {
    setPage(targetPage);
    push(
      {
        pathname: "master-class",
        query: {
          ...query,
          page: targetPage,
        },
      }
      // undefined,
      // { shallow: true }
    );
    document?.getElementById("header-id")?.scrollIntoView(); //{ behavior: "smooth" }
  };

  return (
    <div
      className=" text-white min-h-[calc(100vh-120px)] flex flex-col p-[24px] py-[40px]"
      id="to-top"
    >
      <div className="max-w-[1600px] w-[100%] flex flex-col mx-auto gap-[60px]">
        <>
          {/* GET FIRST ITEM */}
          {classes?.firstItemOnPage && (page === 1 || page === 0) && (
            <div
              className={`
                  flex gap-[20px] items-center
                  xl:flex-row
                  lg:flex-row
                  flex-col-reverse
                `}
            >
              <div
                className={`
                    flex-1 w-[100%]
                    xl:max-w-[50%] lg:max-w-[50%]
                  `}
              >
                <div className="flex flex-col gap-[22px] max-w-[525px] w-[100%]">
                  <h6 className="text-white text-[20px] flex items-center gap-[12px]">
                    <CalendarIcon color="#94A3BB" width={28} height={28} />
                    <span className="text-[#94A3BB]">
                      {moment(classes?.firstItemOnPage?.publishedAt).format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                  </h6>
                  <h3 className="text-[36px]">
                    {classes?.firstItemOnPage?.title}
                  </h3>
                  <p className="text-[#94A3BB] text-[15px] leading-[1.75em]">
                    {classes?.firstItemOnPage?.summary}
                  </p>
                  {/* <div className="flex gap-[20px]">
                    <Link
                      href={`/master-class/${classes?.firstItemOnPage?.slug}`}
                      className="w-[240px] h-[40px] flex items-center justify-center text-white bg-[#0049E0] border-[#0049E0] border-[1px] rounded-[4px]"
                    >
                      {!classes?.firstItemOnPage?.isJoined
                        ? "Je participe"
                        : "J'ai participé, Consulter"}
                    </Link>
                    <Link
                      href={`/master-class/${classes?.firstItemOnPage?.slug}`}
                      className="w-[240px] h-[40px] flex items-center justify-center text-white bg-[#282C38] rounded-[4px]"
                      // border-[#475569] border-[1px]
                    >
                      En savoir plus
                    </Link>
                  </div> */}
                </div>
              </div>
              <div
                className={`
                    flex-1 w-[100%]
                    xl:max-w-[50%] lg:max-w-[50%]
                  `}
              >
                <div
                  className="relative w-[100%] overflow-hidden rounded-[8px]"
                  style={{ paddingBottom: calculateHeight(675, 350) }}
                >
                  <ImageCard
                    height="100%"
                    // path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699357120/images/cheerful-ethnic-doctor-with-arms-crossed_1_y3qtup.jpg"
                    path={defineImageURI(classes?.firstItemOnPage?.imagePath)}
                    iconSize="large"
                    link={`/master-class/${classes?.firstItemOnPage?.slug}`}
                    withOverflow={false}
                  />
                </div>
              </div>
            </div>
          )}
          {/* DATA SECTION */}
          <div className="flex flex-wrap gap-[24px] mr-[-24px]" style={{rowGap:"35px"}} >
            {classes?.items?.map((item: any, index: number) => (
              <Fragment key={index}>
                <MasterClassCard
                  id={item?.id}
                  title={item?.title}
                  slug={item?.slug}
                  summary={item?.summary}
                  publishedAt={item?.createdAt}
                  duration={item?.duration}
                  thunbnail={item?.imagePath}
                  bookmarked={item?.isBookmarked}
                  paddingBottom={calculateHeight(300, 165)}
                />
              </Fragment>
            ))}
          </div>
        </>

        {/* PAGINATION */}
        <DefaultPaginate
          initPage={currentPage - 1}
          totalPages={classes?.meta?.totalPages}
          payload={handleChangePage}
          isDark={true}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  const page = Number(query?.page) || 1;
  const { status, data }: any = await getMasterClassesWithPagination(
    page,
    8,
    "FR"
  );

  if (status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: { classes: data, currentPage: page },
  };
};

export default Page;

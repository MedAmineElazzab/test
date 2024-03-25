import { setContext } from "@/_v1/api/api";
import {
  Breadcrumb,
  CongreCard,
  DefaultPaginate,
  SearchFilter,
} from "../../_v1/components";
import { truncate } from "../../_v1/functions";
import { getEventsWithFilters } from "@/_v1/services/events";
import moment from "moment-timezone";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";

const Page = ({ events, currentPage }: any) => {
  const { pathname, query, push } = useRouter();
  const [page, setPage] = useState(currentPage);

  const handleChangePage = (targetPage: number) => {
    setPage(targetPage);
    //
    push(
      {
        pathname: "congres",
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
  console.log("events", events.items);

  return (
    <>
      <div className="flex flex-col  max-w-[1600px] w-[100%] m-auto px-[27px]  ">
        <Breadcrumb items={[{ name: "Congres", path: "/congres" }]} />
        <div className="sticky top-[122.2px] z-[100] bg-[#F3F4F8] ">
            <SearchFilter
              num={4}
              // withProfile
              // withKeywords
              withContries
              withPathologies
              withSpecialities
              withDateRange
            />
          </div>
        <div className="mt-[24px]">
          {/* CONGRES RESULT */}
          <div className="flex flex-wrap gap-[15px] mr-[-20px]">
            {/* {JSON.stringify(events)} */}
            {/* Congres Item Here */}
            {events?.items?.map((item: any, index: number) => (
              <Fragment key={index}>
                <CongreCard
                  id={item?.id}
                  title={item?.title}
                  slug={item?.slug}
                  date={item?.timeSlot?.dateTimeFrom}
                  content={truncate(item?.summary, 75)}
                  isBookmarked={item?.isBookmarked}
                  organizations={item?.EventOrganization?.map((e: any) => ({
                    name: e?.organization?.name,
                    slug: e?.organization?.slug,
                  }))}
                  tags={[
                    { type: "speciality", ...item?.speciality },
                    { type: "category", ...item?.category },
                    // { type: "medicine", ...item?.medicine },
                    // { type: "dci", ...item?.dci },
                    // { type: "type", ...item?.noteType },
                    // { type: "level", ...item?.noteLevel },
                    { type: "disease", ...item?.disease },
                  ]}
                  // LOCATION
                  city={item?.city?.name}
                  country={item?.city?.country?.name_fr}
                  flag={item?.city?.country?.flag}
                />
              </Fragment>
            ))}
          </div>
          {/* PAGINATION */}
          <div className="py-[30px] px-[20px] mt-[15px]">
            <DefaultPaginate
              initPage={currentPage - 1}
              totalPages={events?.meta?.totalPages}
              isDark={false}
              payload={handleChangePage}
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
  const { page, ...filters } = query;
  const p = Number(page) || 1;

  const { status, data }: any = await getEventsWithFilters(
    p,
    12,
    filters,
    "FR"
  );

  if (status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: { events: data, currentPage: p },
  };
};

export default Page;

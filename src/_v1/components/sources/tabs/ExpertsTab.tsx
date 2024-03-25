import { BioIcon, ModuleIcon, NoteIcon } from "@/_v1/icons";
import React, { Fragment, useEffect, useState } from "react";
import { fake_notes } from "../fake__data";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import NoteCard from "../boxes/NoteCard";
import ModuleCard from "../boxes/ModuleCard";
import {
  calculateHeight,
  defineImageURI,
  onlyTextWithTruncate,
} from "@/_v1/functions";
import { Carousel, DefaultPaginate, Slider } from "@/_v1/components";
import api, { setContext } from "@/_v1/api/api";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { fetchModules, getExpertsBySlug } from "@/_v1/services/experts";

type Props = {
  content: any;
  expertId: any;
};

const ExpertsTab = ({ content, expertId }: Props) => {
  const modules1 = content
    .filter((item: any) => item.tab === "modules")
    .map((item: any) => item.data.data);

  const notes1 = content
    .filter((item: any) => item.tab === "notes")
    .map((item: any) => item.data.data);

  console.log(content);

  const [currentTab, setCurrentTab] = useState(content[0].tab);
  const [modules, setModules] = useState<any>({});
  const [notes, setNotes] = useState<any>({});
  const { pathname, query, push } = useRouter();
  const [page, setPage] = useState<number | undefined>(undefined);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

  // // get all modules for one expert by id
  // useEffect(() => {
  //   const fetchModules = async () => {
  //     try {
  //       const res = await api.get(
  //         `/module?expertId=${expertId}&perPage=8${
  //           query.page ? `&page=${query.page}` : ""
  //         }`
  //       );
  //       setModules(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchModules();
  // }, [query, expertId]);

  // // get all notes for one expert by id
  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     try {
  //       const res = await api.get(
  //         `/note?expertId=${expertId}&perPage=6${
  //           query.page ? `&page=${query.page}` : ""
  //         }`
  //       );
  //       setNotes(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchNotes();
  // }, [query, expertId]);

  // handle changes pages // pagination
  const handleChangePage = (targetPage: number) => {
    setPage(targetPage);
    push({
      pathname: ``,
      query: {
        ...query,
        page: targetPage,
      },
    });
    document?.getElementById("header-id")?.scrollIntoView(); //{ behavior: "smooth" }
  };

  // Function to handle tab change
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setTotalPages(
      content.find((e: any) => e.tab === tab).meta?.totalPages || 1
    );
    setPage(content.find((e: any) => e.tab === tab).meta?.currentPage - 1);
    push({
      pathname: ``,
      query: {
        ...query,
        page: 1,
        currentTab: tab,
      },
    });
  };

  
  content
    .find((e: any) => e.tab === "notes")
    .data.map((item: any, _: number) => {
      console.log(  item , "here coco")
    })

  // Rendering the tabs
  const renderTabs = () => {
    return content.map(
      (item: any, index: number) =>
        !item?.isEmpty && (
          <div
            key={index}
            className={`
              cursor-pointer
              h-[38px] px-[10px] flex gap-[9px] items-center justify-center rounded-[4px]
              ${
                currentTab === item.tab &&
                "!bg-[#0049E0] !text-[white] pl-[2px] !gap-[5px]"
              }
              group hover:bg-[#0049E0]/10
            `}
            onClick={() => handleTabChange(item.tab)}
          >
            <span
              className={`
                w-[30px] h-[30px] bg-[#0049E0]/10 flex items-center justify-center rounded-full
                ${currentTab === item.tab ? "text-white" : "text-[#0049E0] "}
                group-hover:bg-[#0049E0]/0
              `}
            >
              {item.icon}
            </span>
            <span
              className={`
                group-hover:text-[#94A3B8] text-[16px] leading-[20px]  text-[#94A3B8] font-[500]
                ${
                  currentTab === item.tab &&
                  "!text-[#ffffff] font-[400] text-[15px]"
                }
              `}
            >
              {item.title}
            </span>
          </div>
        )
    );
  };

  // Fetch Data Foreach Tab
  const fetchTabs = (tab: string) =>
    content?.find((e: any) => e?.tab === tab)?.data;
  content?.find((e: any) => console.log(e?.tab))?.data;

  // Rendering the content based on the current tab

  content
  .find((e: any) => e.tab === "notes")
  .data.map((item: any, _: number) => {
    console.log(item , "isBookmarked item")
  })

  

  const renderContent = () => {
    switch (currentTab) {
      case "bio":
        return (
          <div>
            <h4 className=" text-[19px] text-[#1E293B] leading-[27px] font-[600] ">
              À propos
            </h4>
            <div className="paragraph mt-[21px] text-[#1E293B] font-[400]  text-[16px] leading-[1.75em]">
              {fetchTabs("bio")}
            </div>
          </div>
        );
      case "notes":
        return (
          <div className="flex flex-col gap-[5px]">
            <h4 className=" text-[20px] text-[#1E293B] leading-[30px] font-[600]  ">
              Notes
            </h4>
            <span className="text-[#1E293B] text-[16px] font-[400] leading-[24px] mb-[22.5px] ">
              Tous les notes
            </span>
            <div
              className="notes-container relative mt-[24px] h-fit  w-full gap-[16px] flex flex-wrap     "
              style={{ rowGap: "21px" }}
            >
              <>
                {/* {JSON.stringify(content?.filter((e: any) => e.tab === "notes"))} */}
                {content
                  .find((e: any) => e.tab === "notes")
                  .data.map((note: any, _: number) => {
                    return (
                      <Fragment key={_}>
                        <NoteCard
                          id={note?.id}
                          title={note?.title}
                          slug={note?.slug}
                          date={""}
                          content={note?.content}
                          isBookmarked={note?.isBookmarked}
                          noteLevel={note?.noteLevel?.name}
                          noteExpert={note?.noteExpert?.expert}
                          expert={note?.expert?.expert}
                          tags={[
                            { type: "level", ...note?.noteLevel },
                            { type: "speciality", ...note?.speciality },
                            { type: "category", ...note?.category },
                            // { type: "medicine", ...note?.medicine },
                            // { type: "dci", ...note?.dci },
                            { type: "type", ...note?.noteType },
                            { type: "pathology", ...note?.pathology },
                          ]}
                          key={_}
                        />
                      </Fragment>
                    );
                  })}
              
              </>
            </div>
            <div className="p-[20px] w-[100%]">
                  {/* pagination of list */}
                  <DefaultPaginate
                    initPage={page || 0}
                    totalPages={totalPages || 0}
                    isDark={false}
                    payload={handleChangePage}
                  />
                </div>
          </div>
        );
      case "modules":
        return (
          <div className="flex flex-col gap-[5px]">
            <h4 className=" text-[20px] text-[#1E293B] leading-[30px] font-[600]  ">
              Modules
            </h4>
            <span className="text-[#1E293B] text-[16px] font-[400] leading-[24px] mb-[22.5px] ">
              Tous les modules
            </span>
            <div
              className="flex flex-wrap gap-[35px]  mr-[-35px] 2xl:gap-[35px] 2xl:mr-[-35px]  xl:gap-[25px] xl:mr-[-25px] "
              style={{ rowGap: "30px" }}
            >
              <>
                {content
                  .find((e: any) => e.tab === "modules")
                  .data.map((item: any, _: number) => {
                    return (
                      <Fragment key={_}>
                        <ModuleCard
                          id={item?.id}
                          slug={item?.slug}
                          title={item?.title}
                          publishedAt={item?.createdAt}
                          thunbnail={defineImageURI(item?.imagePath)}
                          paddingBottom={calculateHeight(260, 155)}
                          isBookmarked={item?.isBookmarked}
                          duration={item?.duration}
                          className=" min-w-[275px]"
                          // Experts Data
                          expert={{
                            name: `${item?.moduleExpert?.expert?.firstName} ${item?.moduleExpert?.expert?.lastName}`,
                            picture: defineImageURI(
                              item?.moduleExpert?.expert?.imagePath
                            ),
                            slug:item?.moduleExpert?.expert?.slug
                          }}
                          // Partner Data
                          partner={{
                            name: `${item?.ModulePartner[0]?.organization?.name}`,
                            picture: defineImageURI(
                              item?.ModulePartner[0]?.organization?.imagePath
                            ),
                            slug:item?.ModulePartner[0]?.organization?.slug
                          }}
                          // Reviews Data
                          reviews={{
                            value: item?.reviews,
                            count: item?.reviewsCount,
                          }}
                          // Tags Data
                          tags={[
                            { type: "category", ...item?.category },
                            { type: "speciality", ...item?.speciality },
                            // { type: "medicine", ...item?.medicine },
                            // { type: "dci", ...item?.dci },
                            // { type: "type", ...item?.noteType },
                            // { type: "level", ...item?.noteLevel },
                            // { type: "pathology", ...item?.pathology },
                          ]}
                          // Pathology Data
                          pathology={item?.pathology}
                          //
                        />
                      </Fragment>
                    );
                  })}
                <div className="p-[20px] w-[100%]">
                  {/* pagination of list */}
                  <DefaultPaginate
                    initPage={page || 0}
                    totalPages={totalPages || 0}
                    isDark={false}
                    payload={handleChangePage}
                  />
                </div>
              </>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center gap-[20px] bg-[white] p-[30px] pt-[30px]">
        {renderTabs()}
      </div>
      <div className="bg-[#0049E00A]  px-[55px] py-[31px]">
        {renderContent()}
      </div>
    </>
  );
};

export default ExpertsTab;

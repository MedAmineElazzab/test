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
import { Carousel, DefaultPaginate, ExpertCard, Slider } from "@/_v1/components";
import { useRouter } from "next/router";
import api from "@/_v1/api/api";

type Props = {
  content: any;
};

const InstatitionTab = ({ content }: Props) => {
  const [currentTab, setCurrentTab] = useState(content[0].tab);
  const [modules, setModules] = useState<any>({});
  const [notes, setNotes] = useState<any>({});
  const [experts, setExperts] = useState<any>({});
  const { pathname, query, push } = useRouter();
  const [page, setPage] = useState<number | undefined>(undefined);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
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

  const organizationId = 1 || null;

  // get all modules for one expert by id
  // useEffect(() => {
  //   const fetchModules = async () => {
  //     try {
  //       const res = await api.get(
  //         `/module?organizationId=${organizationId}&perPage=8${
  //           query.page ? `&page=${query.page}` : ""
  //         }`
  //       );
  //       setModules(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchModules();
  // }, [query]);

  // // get all notes for one expert by id
  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     try {
  //       const res = await api.get(
  //         `/note?organizationId=${organizationId}&perPage=6${
  //           query.page ? `&page=${query.page}` : ""
  //         }`
  //       );
  //       setNotes(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchNotes();
  // }, [query]);

  // // get all experts for one expert by id
  // useEffect(() => {
  //   const fetchExperts = async () => {
  //     try {
  //       const res = await api.get(
  //         `/expert?organizationId=${organizationId}&perPage=10${
  //           query.page ? `&page=${query.page}` : ""
  //         }`
  //       );
  //       setExperts(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchExperts();
  // }, [query]);

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

  console.log(
    content
      .find((e: any) => e.tab === "notes")
      .data.map((item: any, _: number) => item)
  );

  // Rendering the tabs
  const renderTabs = () => {
    return content.map(
      (item: any, index: number) =>
        !item?.isEmpty && (
          <div
            key={index}
            className={`
              cursor-pointer
              h-[38px] px-[10px] flex gap-[10px] items-center justify-center rounded-[4px]
              ${
                currentTab === item.tab &&
                "!bg-[#0049E0] px-[20px] py-[10px] !text-[white]  !gap-[5px]"
              }
              group hover:bg-[#0049E0]/10
            `}
            onClick={() => handleTabChange(item.tab)}
          >
            <span
              className={`
              h-[30px] bg-[#0049E0]/10  flex items-center justify-center rounded-full
                ${currentTab === item.tab ? "text-white  " : "text-[#0049E0]"}
                ${item.icon ? " w-[30px] " : "w-[0px]"}   
                "
                group-hover:bg-[#0049E0]/0
              `}
            >
              {item.icon}
            </span>
            <span
              className={`
                group-hover:text-[#94A3B8] text-[#94A3B8]
                ${
                  currentTab === item.tab &&
                  "!text-[#ffffff] leading-[20px] text-[15px] font-[600]"
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

  // Rendering the content based on the current tab
  const renderContent = () => {
    switch (currentTab) {
      case "bio":
        return (
          <div className="flex flex-col gap-[5px]">
            <h4 className=" text-[20px] text-[#1E293B] leading-[30px] font-[600]  ">
              Description
            </h4>
            <div className="paragraph mt-[30px] text-[#344154] text-[16px] leading-[1.75em]">
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
              className="notes-container relative mt-[24px] h-fit  w-full gap-[16px] flex flex-wrap "
              style={{ rowGap: "21px" }}
            >
              <>
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
                            name: `${item?.ModuleExpert?.expert?.firstName} ${item?.ModuleExpert?.expert?.lastName}`,
                            picture: defineImageURI(
                              item?.ModuleExpert?.expert?.imagePath
                            ),
                            slug: item?.ModuleExpert?.expert?.slug,
                          }}
                          // Partner Data
                          partner={{
                            name: `${item?.ModulePartner[0]?.organization?.name}`,
                            picture: defineImageURI(
                              item?.ModulePartner[0]?.organization?.imagePath
                            ),
                            slug: item?.ModulePartner[0]?.organization?.slug,
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
      case "experts":
        return (
          <div className="flex flex-col gap-[5px]">
            <h4 className=" text-[20px] text-[#1E293B] leading-[30px] font-[600]  ">
              Experts
            </h4>
            <span className="text-[#1E293B] text-[16px] font-[400] leading-[24px] mb-[22.5px] ">
              Tous les experts
            </span>
            <div
              className=" flex flex-wrap gap-[14px]  mr-[-14px] 2xl:gap-[14px] 2xl:mr-[-14px]  xl:gap-[14px] xl:mr-[-14px] "
              style={{ rowGap: "30px" }}
            >
              <>
                {content
                  .find((e: any) => e.tab === "experts")
                  .data.map((item: any, _: number) => {
                    return (
                      <Fragment key={_}>
                        <ExpertCard
                          firstName={item?.firstName}
                          lastName={item?.lastName}
                          photo={defineImageURI(item?.imagePath)}
                          note={item?.note}
                          slug={item?.slug}
                          expertises={
                            item?.ExpertSpeciality.map((e: any) => ({
                              name: e?.speciality?.name,
                            })) || []
                          }
                          typeStyle=""
                          className="min-w-[245px] text-white"
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
      <div className="bg-[#0049E00A] px-[37px] py-[25px] ">
        {renderContent()}
      </div>
    </>
  );
};

export default InstatitionTab;
//
//In this updated code, I have added comments to explain the purpose of each function and the logic behind the rendering of the tabs and content. Additionally, I have separated the rendering of the tabs and content into separate functions to improve readability and maintainability..</s>

import { setContext } from "@/_v1/api/api";
import {
  Breadcrumb,
  ExpertCard,
  ExpertsTab,
  ThumbnailCard,
} from "../../_v1/components";
import {
  BioIcon,
  CheckmarkIcon,
  FavouriteCircledIcon,
  InstituteIcon,
  LinkIcon,
  LinkedInIcon,
  ModuleIcon,
  NoteIcon,
  NotificationPlusIcon,
} from "../../_v1/icons";
import parse from "html-react-parser";
import {
  fetchModules,
  fetchNotes,
  getExpertsBySlug,
  onUserFollowAnExpertsById,
} from "@/_v1/services/experts";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAlerts from "@/_v1/hooks/useAlerts";
import Link from "next/link";
import { ResumeComponent } from "../institutions";

type Props = {
  currentExpert: any;
  currentSlug: string;
  modules: any;
  notes: any;
};

const Page = ({ currentExpert, modules, notes }: Props) => {
  const { push, query } = useRouter();
  const { onThemeAlert } = useAlerts();
  const [isFollowed, setIsFollowed] = useState(
    currentExpert?.isFollowed || false
  );

  const [followerCounter, setFollowerCounter] = useState(
    currentExpert?._count?.ExpertsFollowers || 0
  );

  const handleFollowAnExpert = async () => {
    try {
      setIsFollowed(!isFollowed);
      await onUserFollowAnExpertsById(currentExpert?.id);

      const newCounter = isFollowed ? followerCounter - 1 : followerCounter + 1;
      setFollowerCounter(newCounter);

      let title = !isFollowed ? "Success" : "Info";

      let msg = !isFollowed
        ? "You have successfully followed the expert. Thank you."
        : "You have successfully unfollowed the expert. Thank you.";

      let status: "SUCCESS" | "ERROR" | "WARN" | "INFO" = !isFollowed
        ? "SUCCESS"
        : "INFO";

      onThemeAlert(title, msg, status, "LIGHT", 5000);
    } catch (err) {}
  };

  useEffect(() => {
    push({
      pathname: "",
      query: {
        ...query,
        currentTab: "bio",
      },
    });
    document?.getElementById("header-id")?.scrollIntoView(); //{ behavior: "smooth" }
  }, []);

  console.log(currentExpert?._count);

  return (
    <div className="flex flex-col gap-[25px] p-[10px]">
      {/* <div className="mt-[15px] px-[35px]" >
         <Breadcrumb items={[{ name: "Experts", path: "/experts" } , { name:  currentExpert.firstName + " " + currentExpert.lastName, path: "/experts" }  ]}   />
      </div> */}
      <div className="min-h-[calc(100vh-120px)] flex flex-col p-[30px] py-[30px] mb-[30px]">
        {/* {JSON.stringify(currentExpert)} */}
        {/* The main container of the page */}
        <div className="bg-[#ffffff] py-[30px] px-[55px] pb-[20px]  ">
          {/* The header section of the page */}
          <div className="flex gap-[27px] mt-[8px]">
            <div className="relative w-[120px] h-[120px] overflow-hidden rounded-full mt-[10px]">
              {/* The thumbnail card component */}
              <ThumbnailCard
                height="100%"
                path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699967678/images/noImage_4_yozuxs.jpg"
                withOverflow={false}
              />
            </div>
            <div className="calc(100%-150px)">
              {/* EXPERT FOLOWERS */}
              <div className="flex items-center gap-[25px]">
                <h4 className="font-[600] text-[#1E293B]  text-[20px] mr-[10px]">{`${currentExpert?.firstName} ${currentExpert?.lastName}`}</h4>
                <button
                  className={`
                    h-[38px] justify-center gap-[6px] w-[103px] px-[15px] text-[15px] leanding-[21px] font-[500] tracking-[0.5px] rounded-[4px] text-white flex items-center
                    ${
                      isFollowed
                        ? "bg-[#0049E0]/20 !text-[#0049E0]"
                        : "bg-[#0049E0]"
                    }
                  `}
                  onClick={() => handleFollowAnExpert()}
                >
                  {isFollowed ? (
                    <CheckmarkIcon width={14} height={14} color="#0049E0" />
                  ) : (
                    <NotificationPlusIcon
                      className="h-[10px] w-[10px]"
                      color="#FFFFFF"
                    />
                  )}
                  {isFollowed ? "Unfollow" : "Follow"}
                </button>
                {/* <button
                  className="bg-[#0049E0] h-[38px] w-[38px] rounded-[4px] text-white flex justify-center items-center"
                  onClick={() => {}}
                >
                  <FavouriteCircledIcon className="w-[30px] text-white" />
                </button> */}
              </div>
              {/* EXPERT AT */}
              <div className="mt-[10px] mb-[17px]">
                <span className="text-[#94A3B8] lending-[24px] text-[16px]  font-[400]">
                  Expert dans le domaine :{" "}
                  <b className="text-[#1E293B]">{currentExpert?.note}</b>
                </span>
              </div>
              {/* EXPERT STATUS */}
              <div className="flex gap-[40px] flex-wrap">
                <span className="text-[#94A3B8] text-[18px] font-[500] ">
                  <b className="text-[#1E293B] mr-[6px] font-[600]">
                    {currentExpert?._count?.NoteExpert}
                  </b>
                  Notes
                </span>
                <span className="text-[#94A3B8] text-[18px] font-[500] ">
                  <b className="text-[#1E293B] mr-[6px] font-[600]">
                    {currentExpert?._count?.ModuleExpert}
                  </b>
                  Modules
                </span>
                <span className="text-[#94A3B8] text-[18px] font-[500] ">
                  <b className="text-[#1E293B] mr-[6px] font-[600]">
                    {followerCounter}
                  </b>
                  Followers
                </span>
              </div>
              {/* EXPERT DESCRIPTION */}
              <div className="paragraph line max-w-[543px]  w-[100%] font-[400] leading-[1.25em] text-[#1E293D] text-[16px] pt-[20px]">
                <ResumeComponent resume={currentExpert.resume} />
              </div>
              {/* EXPERT LINKS */}
              <div className="flex gap-[30px] items-center pt-[20px] flex-wrap">
                <div className="flex gap-[10px] items-center">
                  <a
                    className="group flex gap-[10px] items-center"
                    href={`http://${currentExpert?.website}`}
                    target="_blank"
                  >
                    <div className="w-[30px] h-[30px] bg-[#0049E01A] flex justify-center items-center rounded-full">
                      <LinkIcon width={15} height={15} color="#0049E0" />
                    </div>
                    <span className="group-hover:underline">{`${currentExpert?.website}`}</span>
                  </a>
                </div>
                <div className="flex gap-[10px] items-center">
                  <a
                    className="group flex gap-[10px] items-center"
                    href={`https://www.linkedin.com/${currentExpert?.linkedin}`}
                    target="_blank"
                  >
                    <div className="w-[30px] h-[30px] bg-[#0049E01A] flex justify-center items-center rounded-full">
                      <LinkedInIcon width={17} height={17} color="#0049E0" />
                    </div>
                    <span className="group-hover:underline">{`${currentExpert?.linkedin}`}</span>
                  </a>
                </div>
                <div className="flex gap-[10px] items-center">
                  <Link
                    className="group flex gap-[10px] items-center"
                    href={`/institutions/${currentExpert?.organization?.slug}`}
                  >
                    <div className="w-[30px] h-[30px] bg-[#0049E01A] flex justify-center items-center rounded-full">
                      <InstituteIcon width={19} height={16} color="#0049E0" />
                    </div>
                    <span className="group-hover:underline">{`${currentExpert?.organization?.name}`}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TABS */}
        <div className="flex flex-col">
          <ExpertsTab
            expertId={currentExpert.id}
            content={[
              {
                tab: "bio",
                title: "Biographie",
                icon: (
                  <>
                    <BioIcon
                      width={16}
                      height={20}
                      color="currentColor"
                      className="mr-[-1px]"
                    />
                  </>
                ),
                data: parse(currentExpert?.about || ""),
                meta: undefined,
                isEmpty: false,
              },
              {
                tab: "notes",
                title: "Notes",
                icon: (
                  <>
                    <NoteIcon
                      width={20}
                      height={20}
                      color="currentColor"
                      className="mr-[-2px]"
                    />
                  </>
                ),
                data: notes?.items || [],
                meta: notes?.meta || {},
                isEmpty: notes?.items.length === 0 ? true : false,
              },
              {
                tab: "modules",
                title: "Modules",
                icon: (
                  <>
                    <ModuleIcon
                      width={20}
                      height={20}
                      color="currentColor"
                      className="mr-[-1px]"
                    />
                  </>
                ),
                data: modules?.items || [],
                meta: modules?.meta || {},
                isEmpty: modules?.items.length === 0 ? true : false,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  const expert: any = await getExpertsBySlug(String(query?.slug));
  const modules: any = await fetchModules(
    expert?.data.id,
    Number(query.currentTab === "module" ? query.page : 1)
  );
  const notes: any = await fetchNotes(
    expert?.data.id,
    Number(query.currentTab === "notes" ? query.page : 1)
  );

  if (expert?.status === 404) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      currentExpert: expert.data,
      modules: modules.data,
      notes: notes.data,
      currentSlug: String(query?.slug) || "",
    },
  };
};

export default Page;

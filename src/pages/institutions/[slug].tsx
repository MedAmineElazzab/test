import { setContext } from "@/_v1/api/api";
import { GetServerSideProps } from "next";
import {
  ExpertCard,
  ExpertsTab,
  InstatitionTab,
  ThumbnailCard,
} from "../../_v1/components";
import {
  BioIcon,
  CheckmarkIcon,
  ExpertsIcon,
  FavouriteCircledIcon,
  InstituteIcon,
  LinkIcon,
  LinkedInIcon,
  ModuleIcon,
  NoteIcon,
  NotificationPlusIcon,
} from "../../_v1/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  fetchExperts,
  fetchModules,
  fetchNotes,
  getOrganizationsBySlug,
  onUserFollowAnOrganizationById,
} from "@/_v1/services/organizations";
import parse from "html-react-parser";
import useAlerts from "@/_v1/hooks/useAlerts";
import { ResumeComponent } from ".";
import AddIcon from "@/_v1/icons/sources/AddIcon";

type Props = {
  currentOrganization: any;
  currentSlug: string;
  modules: any;
  notes: any;
  experts: any;
};
// page
const Page = ({
  currentOrganization,
  currentSlug,
  notes,
  modules,
  experts,
}: Props) => {
  const { push, query } = useRouter();
  const { onThemeAlert } = useAlerts();
  const [isFollowed, setIsFollowed] = useState(
    currentOrganization?.isFollowed || false
  );

  const [followerCounter, setFollowerCounter] = useState(
    currentOrganization?._count?.OrganizationFollower || 0
  );

  const handleFollowAnInstitutions = async () => {
    try {
      setIsFollowed(!isFollowed);
      await onUserFollowAnOrganizationById(currentOrganization?.id);

      const newCounter = isFollowed ? followerCounter - 1 : followerCounter + 1;
      setFollowerCounter(newCounter);

      let title = !isFollowed ? "Success" : "Info";

      let msg = !isFollowed
        ? "You have successfully followed the institution. Thank you."
        : "You have successfully unfollowed the institution. Thank you.";

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

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col p-[30px] py-[30px] mb-[30px]">
      {/* The main container of the page */}
      <div className="bg-[#ffffff] py-[45px] px-[78px]">
        {/* The header section of the page */}
        <div className="flex gap-[35px]">
          <div className="relative w-[86px] h-[66px] overflow-hidden object-contain ">
            {/* The thumbnail card component */}
            <img
              src="/assets/images/institution.svg"
              className="w-[100%] h-[100%]"
            />
          </div>
          <div className="calc(100%-150px)">
            {/* EXPERT FOLOWERS */}
            <div className="flex items-center gap-[17px]">
              <h4 className="font-[600] text-[20px] leading-[30px]   text-[#1E293B] ">
                {currentOrganization?.name}
              </h4>
              <button
                className={`
                  h-[38px] w-[103px]  justify-center text-[15px] px-[15px] rounded-[4px] text-white flex gap-[6px] items-center
                  ${
                    isFollowed
                      ? "bg-[#0049E0]/20 !text-[#0049E0]"
                      : "bg-[#0049E0]"
                  }
                `}
                onClick={() => handleFollowAnInstitutions()}
              >
                {isFollowed ? (
                  <CheckmarkIcon width={14} height={14} color="#0049E0" />
                ) : (
                  <AddIcon className="text-[30px]" color="#FFFFFF" />
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
            <div className="mt-[15px] mb-[20px]">
              <span className="text-[#94A3B8]">
                {currentOrganization?.note}
              </span>
            </div>
            {/* EXPERT STATUS */}
            <div className="flex gap-[30px] flex-wrap">
              <span className="text-[#94A3B8] text-[16px] font-[600] flex ">
                <b className="text-[#1E293B] mr-[6px]">
                  {currentOrganization?._count?.NoteOrganization}
                </b>
                Notes
              </span>
              <span className="text-[#94A3B8] text-[16px] font-[600] flex ">
                <b className="text-[#1E293B] mr-[6px]">
                  {currentOrganization?._count?.ModuleOrganization}
                </b>
                Modules
              </span>
              <span className="text-[#94A3B8] text-[16px] font-[600] flex ">
                <b className="text-[#1E293B] mr-[6px]">{followerCounter}</b>
                Followers
              </span>
              <span className="text-[#94A3B8] text-[16px] font-[600] flex ">
                <b className="text-[#1E293B] mr-[6px]">329</b>
                Following
              </span>
            </div>
            {/* EXPERT DESCRIPTION */}
            <div className="paragraph line max-w-[450px] w-[100%] leading-[1.25em] text-[#1E293D] text-[16px] pt-[20px]">
              <ResumeComponent resume={currentOrganization.resume} />
            </div>
            {/* EXPERT LINKS */}
            <div className="flex gap-[30px] items-center pt-[20px] flex-wrap">
              <div className="flex gap-[10px] items-center">
                <a
                  className="flex gap-[10px] items-center group"
                  href={`http://${currentOrganization?.website}`}
                  target="_blank"
                >
                  <div className="w-[30px] h-[30px] bg-[#0049E01A] flex justify-center items-center rounded-full">
                    <LinkIcon width={18} height={18} color="#0049E0" />
                  </div>
                  <span className="group-hover:underline">{`${currentOrganization?.website}`}</span>
                </a>
              </div>
              <div className="flex gap-[10px] items-center">
                <a
                  className="group flex gap-[10px] items-center"
                  href={`https://www.linkedin.com/${currentOrganization?.linkedin}`}
                  target="_blank"
                >
                  <div className="w-[30px] h-[30px] bg-[#0049E01A] flex justify-center items-center rounded-full">
                    <LinkedInIcon width={18} height={18} color="#0049E0" />
                  </div>
                  <span className="group-hover:underline">{`${currentOrganization?.linkedin}`}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TABS */}
      <div className="flex flex-col">
        <InstatitionTab
          content={[
            {
              tab: "bio",
              title: "Description",
              data: parse(currentOrganization?.about || ""),
              isEmpty: false,
            },
            {
              tab: "notes",
              title: "Notes",
              icon: (
                <>
                  <NoteIcon
                    color="currentColor"
                    className="mr-[-2px]  "
                    width={18}
                    height={18}
                  />
                </>
              ),
              data: notes?.items || [],
              meta: notes?.meta || {},
              isEmpty: currentOrganization?.notes?.length === 0 ? true : false,
            },
            {
              tab: "modules",
              title: "Modules",
              icon: (
                <>
                  <ModuleIcon
                    width={18}
                    height={18}
                    color="currentColor"
                    className="mr-[-1px]"
                  />
                </>
              ),
              data: modules?.items || [],
              meta: modules?.meta || {},
              isEmpty:
                currentOrganization?.modules?.length === 0 ? true : false,
            },
            {
              tab: "experts",
              title: "Experts",
              icon: (
                <>
                  <ExpertsIcon
                    width={18}
                    height={18}
                    color="currentColor"
                    className="mr-[-1px]"
                  />
                </>
              ),
              data: experts?.items || [],
              meta: experts?.meta || {},
              isEmpty:
                currentOrganization?.experts?.length === 0 ? true : false,
            },
          ]}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  const { status, data }: any = await getOrganizationsBySlug(
    String(query?.slug)
  );

  const notes: any = await fetchNotes(
    data.id,
    Number(query.currentTab === "notes" ? query.page : 1)
  );
  const modules: any = await fetchModules(
    data.id,
    Number(query.currentTab === "module" ? query.page : 1)
  );
  const experts: any = await fetchExperts(
    data.id,
    Number(query.currentTab === "experts" ? query.page : 1)
  );

  if (data.status === 404) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      currentOrganization: data,
      notes: notes.data,
      modules: modules.data,
      experts: experts.data,
      currentSlug: String(query?.slug) || "",
    },
  };
};

export default Page;

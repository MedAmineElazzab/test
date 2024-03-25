import {
  Breadcrumb,
  Carousel,
  DefaultPaginate,
  DocumentsTypeCard,
  EventCard,
  ExpertCard,
  Reviews,
  ThumbnailCard,
} from "../../../_v1/components";
import {
  calculateHeight,
  createGoogleCalendarEvent,
  createOutlookCalendarEvent,
  createYahooCalendarEvent,
  defineImageURI,
  onDownloadAttachments,
} from "../../../_v1/functions";
import useCountdown from "@/_v1/hooks/useCountdown";
import {
  AppleCalendarIcon,
  DocumentPDFIcon,
  DownloadIcon,
  GoogleCalendarIcon,
  OrganizationIcon,
  OutlookCalendarIcon,
  YahooCalendarIcon,
} from "../../../_v1/icons";
import { MoroccoFlag } from "@/_v1/icons/sources/flags";
import moment from "moment-timezone";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
  downloadICSFile,
  generateGoogleCalendarLink,
  generateOutlookCalendarLink,
  generateYahooCalendarLink,
} from "@/_v1/functions/calendar";
import api, { setContext } from "@/_v1/api/api";
import {
  getEventBySlug,
  getEventDetailById,
  getExpertsByIdEvent,
  onSendReviewEventById,
} from "@/_v1/services/events";
import useAlerts from "@/_v1/hooks/useAlerts";
import { useRouter } from "next/router";
import { SuccessIcon } from "@/_v1/hooks/useAlerts/icons";
import { notifications } from "@mantine/notifications";

type Props = {
  content: any;
  currentSlug: string;
  detail: any;
  experts: any;
};

const Page = ({ content, currentSlug, detail, experts }: Props) => {
  const { onAlert } = useAlerts();
  const { timeRemaining } = useCountdown(content?.timeSlot?.dateTimeTo);
  const { pathname, query, push } = useRouter();
  const [page, setPage] = useState<number | undefined>(undefined);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [currentArea, setCurrentArea] = useState<string>("description");
  const handleClickScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setCurrentArea(id);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [checkIsRegistered, setCheckIsRegistered] = useState(
    content.isRegistered || false
  );

  const handleDownload = async (path: string) => {
    const { status } = await onDownloadAttachments(path);
    if (status === 200)
      onAlert(
        "Success",
        "You have been download the attachment successfully!",
        "SUCCESS",
        5000
      );
    else onAlert("Error", "Your download has been failed!", "ERROR", 5000);
  };

  const handleRegisterEvent = async () => {
    try {
      await api.put(`/event/join/${content.slug}`);
      notifications.show({
        id: "load-data",
        title: (
          <span className="font-bold">you have been registred successfully!</span>
        ),
        message: (
          <span>
            Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page
          </span>
        ),
        icon: <SuccessIcon className="w-[40px] text-white" />,
        autoClose: 3000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: "#0049E0",
          },
        },
      });
      setCheckIsRegistered(true);
    } catch (error) {
      console.log(error);
      setCheckIsRegistered(false);
    }
  };



  const onSendReview = async (data: any) => {
    try {
      await onSendReviewEventById(content?.id, data);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

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

  const handleChangePage1 = (targetPage: number) => {
    setPage(targetPage);
    push({
      pathname: ``,
      query: {
        ...query,
        pageExperts: targetPage,
      },
    });
    document?.getElementById("header-id")?.scrollIntoView(); //{ behavior: "smooth" }
  };
  useEffect(() => {
    push({
      pathname: ``,
      query: {
        ...query,
        id: content.id,
      },
    });
    document?.getElementById("header-id")?.scrollIntoView(); //{ behavior: "smooth" }
  }, []);

  console.log(detail);

  return (
    <div className="flex flex-col gap-[20px] max-w-[1600px] w-[100%] m-auto px-[24px] p-[30px] py-[40px] text-[#1F1F1F] !scroll-smooth overflow-x-hidden ">
      <div>
        <Breadcrumb
          items={[
            { name: "Congres", path: "/congres" },
            {
              name: content?.title || "",
              path: content?.slug || "",
            },
          ]}
        />
      </div>
      <div className="flex gap-[36px] items-start">
        <div className="w-[calc(100%-357px)] p-[30px] bg-[#ffffff]  border-[1px] border-[#E2E8F0] rounded-[4px]">
          <div className="max-w-[800px] w-[100%] xl:max-w-[90%] ">
            {/* TITLE AREA */}
            <h2 className="text-[34px] text-[#1F1F1F]  font-semibold leading-[48px] mb-[20px] ">
              {content?.title}
            </h2>
            {/* THUMBNAIL AREA */}
            <div
              className="relative w-[100%] "
              style={{ paddingBottom: calculateHeight(735, 300) }}
            >
              <ThumbnailCard
                height="100%"
                path={defineImageURI(content?.imagePath)}
                withOverflow={false}
              />
            </div>
            <div>
              {/* PLACE AREA */}
              <div className="flex gap-[10px] text-[14px] mt-[23px] items-center">
                <span className="text-[14px] font-[400] text-[#1F1F1F] ">
                  {moment(new Date()).format("MMM DD, YYYY")}
                </span>
                <div className="flex gap-[6px] items-center">
                  <img
                    src={content?.city?.country?.flag}
                    className="w-[25px] h-[25px] rounded-full object-cover "
                    alt={`flag country`}
                  />
                  <span className="text-[#2B2C34] text-[14px]">
                    {content?.city?.name}, {content?.city?.country?.name_fr}
                  </span>
                </div>
              </div>
              {/* EVENT AREA */}
              <div className="flex gap-[20px] items-center mt-[21px]">
                {!checkIsRegistered && (
                  <button
                    className="bg-[#0049E0] text-[#ffffff] px-[25px] py-[15px] font-semibold rounded-[4px] text-[16px]"
                    onClick={handleRegisterEvent}
                  >
                    Register for events
                  </button>
                )}
                <div className="flex flex-col gap-[8px]">
                  {/* <p className="text-[#373A3C] font-[400]  text-[15px] leading-[20px] ">
                    Try for Free: Enroll to start your full access free trial
                  </p> */}

                  <p className="text-[#373A3C] font-[400]  text-[15px] leading-[20px] ">
                    Medical aid available
                  </p>
                </div>
              </div>
              {/* LINKS */}
              <div className="flex gap-[55px] border-b-[2px] border-[#0049E0] py-[20px] mt-[30px] mb-[20px]">
                <a
                  className={`
                      leading-[25px] cursor-pointer text-[16px] font-[600]  ${
                        currentArea === "description"
                          ? "text-[#0049E0]"
                          : "text-[#1F1F1F]"
                      }`}
                  onClick={() => handleClickScroll("description")}
                >
                  Description
                </a>
                <a
                  className={`
                      leading-[25px] cursor-pointer text-[16px] font-[600]  ${
                        currentArea === "speakers"
                          ? "text-[#0049E0]"
                          : "text-[#1F1F1F]"
                      }`}
                  onClick={() => handleClickScroll("speakers")}
                >
                  Speakers
                </a>
                <a
                  className={`
                      leading-[25px] cursor-pointer text-[16px] font-[600]  ${
                        currentArea === "organisateurs"
                          ? "text-[#0049E0]"
                          : "text-[#1F1F1F]"
                      }`}
                  onClick={() => handleClickScroll("organisateurs")}
                >
                  Organisateurs
                </a>
                <a
                  className={`
                      leading-[25px] cursor-pointer text-[16px] font-[600]  ${
                        currentArea === "trials"
                          ? "text-[#0049E0]"
                          : "text-[#1F1F1F]"
                      }`}
                  onClick={() => handleClickScroll("trials")}
                >
                  Extrait du congrès
                </a>
              </div>
              {/* DESCRIPTION */}
              <span
                className="block h-[100px] mt-[-100px] invisible"
                id="description"
              ></span>
              <div className="flex flex-col text-[#000000] scroll-pt-[60px]">
                <p className="text-[16px] font-[400] text-justify leading-[26px]">
                  {content?.description}
                </p>
                <h4 className="text-[20px] font-[600] mt-[20px] mb-[20px] leading-[33px]">
                  Programme
                </h4>
                <p className="text-[16px] font-[400] text-justify leading-[26px]">
                  {content?.objective}
                </p>
                <h4 className="text-[20px] font-[600] mt-[20px] mb-[20px] leading-[33px]">
                  Documents
                </h4>
                <div
                  className="flex flex-wrap gap-[20px]"
                  style={{ rowGap: "15px" }}
                >
                  {/* <div className="flex items-center justify-between gap-[15px] min-w-[225px] max-w-[275px] shadow-attachment w-[100%] bg-[#FFFFFF] border-[#D9D9D966] border-[1px] rounded-[8px] p-[12px] pl-[8px]">
                    <DocumentPDFIcon width={45} height={45} /> //DocumentsTypeCard
                    <div className="relative ml-[-5px] w-[calc(100%-100px)]">
                      <h6 className="font-[600] text-[14px] text-[#000000]">
                        Written exam template
                      </h6>
                      <span className="text-[#6B6B6B] text-[12px]">
                        42 KB · v1.0.0
                      </span>
                    </div>
                    <button onClick={() => {}}>
                      <DownloadIcon
                        width={40}
                        height={40}
                        className="text-[#0049E0] hover:!text-[#0049E070]"
                      />
                    </button>
                  </div> */}
                  {content?.Attachement?.map((item: any, index: number) => (
                    <>
                      <div className="flex items-center justify-between gap-[15px] min-w-[225px] max-w-[275px] shadow-attachment w-[100%] bg-[#FFFFFF] border-[#D9D9D966] border-[1px] rounded-[8px] p-[12px] pl-[8px]">
                        <DocumentsTypeCard type={item?.type} />
                        <div className="relative ml-[-5px] w-[calc(100%-100px)]">
                          <h6 className="font-[600] text-[14px] text-[#000000]">
                            {item?.name}
                          </h6>
                          <span className="text-[#6B6B6B] text-[12px]">
                            {item?.size}
                          </span>
                        </div>
                        <button onClick={() => handleDownload(item?.path)}>
                          <DownloadIcon
                            width={40}
                            height={40}
                            className="text-[#0049E0] hover:!text-[#0049E070]"
                          />
                        </button>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[375px] w-[100%] flex flex-col gap-[10px] relative lg:sticky lg:top-[0px] h-auto lg:self-start">
          {/* COUNTDOWN AREA */}
          <div className="w-[100%] p-[20px] bg-[#ffffff] border-[1px] border-[#E2E8F0] rounded-[4px] flex gap-[17.5px] justify-center items-center">
            {timeRemaining && (
              <>
                {/* DAYS */}
                <div className="relative w-[65px] h-[65px] flex items-center justify-center">
                  <div className="animate-spin-slow absolute z-[1] w-[100%] h-[100%] top-[0px] right-[0px]">
                    <ThumbnailCard
                      height="100%"
                      path="/assets/images/countdown/days.png"
                      withOverflow={false}
                    />
                  </div>
                  <div className="absolute z-[2] w-[100%] h-[100%] flex flex-col gap-[0px] items-center justify-center">
                    <span className="text-[20px] font-semibold">
                      {timeRemaining?.days}
                    </span>
                    <span className="text-[11px]">DAY</span>
                  </div>
                </div>
                {/* Hours */}
                <div className="relative w-[65px] h-[65px] flex items-center justify-center">
                  <div className="animate-spin-slow absolute z-[1] w-[100%] h-[100%] top-[0px] right-[0px]">
                    <ThumbnailCard
                      height="100%"
                      path="/assets/images/countdown/hours.png"
                      withOverflow={false}
                    />
                  </div>
                  <div className="absolute z-[2] w-[100%] h-[100%] flex flex-col gap-[0px] items-center justify-center">
                    <span className="text-[20px] font-semibold">
                      {timeRemaining?.hours}
                    </span>
                    <span className="text-[11px]">HR</span>
                  </div>
                </div>
                {/* Munites */}
                <div className="relative w-[65px] h-[65px] flex items-center justify-center">
                  <div className="animate-spin-slow absolute z-[1] w-[100%] h-[100%] top-[0px] right-[0px]">
                    <ThumbnailCard
                      height="100%"
                      path="/assets/images/countdown/minutes.png"
                      withOverflow={false}
                    />
                  </div>
                  <div className="absolute z-[2] w-[100%] h-[100%] flex flex-col gap-[0px] items-center justify-center">
                    <span className="text-[20px] font-semibold">
                      {timeRemaining?.minutes}
                    </span>
                    <span className="text-[11px]">MIN</span>
                  </div>
                </div>
                {/* Seconds */}
                <div className="relative w-[65px] h-[65px] flex items-center justify-center">
                  <div className="animate-spin-slow absolute z-[1] w-[100%] h-[100%] top-[0px] right-[0px]">
                    <ThumbnailCard
                      height="100%"
                      path="/assets/images/countdown/seconds.png"
                      withOverflow={false}
                    />
                  </div>
                  <div className="absolute z-[2] w-[100%] h-[100%] flex flex-col gap-[0px] items-center justify-center">
                    <span className="text-[20px] font-semibold">
                      {timeRemaining?.seconds}
                    </span>
                    <span className="text-[11px]">SEC</span>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* EVENT INFO */}
          <div className="w-[100%] p-[30px] bg-[#ffffff] border-[1px] border-[#E2E8F0] text-[15px] h-[210px] flex justify-center flex-col ">
            <div className="flex gap-[6px] py-[15px] border-b-[1px] border-[#1F1F1F33] last:!border-b-[0px]">
              <b className="leading-[26px] text-[#1F1F1F] text-[15px] ">
                Date :
              </b>
              <span className="leading-[26px] text-[#1F1F1F] text-[15px] ">
                {`
                  ${moment(content?.timeSlot?.dateTimeFrom)
                    .tz("Africa/Casablanca")
                    .format("MMMM DD, YYYY")} - ${moment(
                  content?.timeSlot?.dateTimeTo
                )
                  .tz("Africa/Casablanca")
                  .format("MMMM DD, YYYY")}
                `}
              </span>
            </div>
            <div className="flex gap-[6px] py-[16px] border-b-[1px] border-[#1F1F1F33] last:!border-b-[0px]">
              <b className="leading-[26px] text-[#1F1F1F] text-[15px] ">
                Time :
              </b>
              <span className="leading-[26px] text-[#1F1F1F] text-[15px] ">
                {`
                  ${moment(content?.timeSlot?.dateTimeFrom)
                    .tz("Africa/Casablanca")
                    .format("HH:mm a")} - ${moment(
                  content?.timeSlot?.dateTimeTo
                )
                  .tz("Africa/Casablanca")
                  .format("HH:mm a")}
                `}
                (UTC)
              </span>
            </div>
            <div className="flex gap-[6px] py-[16px] border-b-[1px] border-[#1F1F1F33] last:!border-b-[0px]">
              <b className="leading-[26px] text-[#1F1F1F] text-[15px] ">
                Venue :
              </b>
              <span className="leading-[26px] text-[#1F1F1F] text-[15px] ">
                {content?.city?.name}, {content?.city?.country?.name_fr}
              </span>
            </div>
          </div>
          {/* ORGANIZATION AREA */}
          <div className="w-[100%] p-[20px] bg-[#ffffff] border-[1px] border-[#E2E8F0] text-[15px]">
            <h5 className="text-[#1F1F1F] text-[15px] font-semibold mb-[10px]">
              Le soutient institutionnel de :
            </h5>
            {content?.EventOrganization.map((item: any, index: number) => (
              <>
                <div className="flex group items-center gap-[10px] py-[12.5px] border-b-[1px] border-[#1F1F1F33] last:!border-b-[0px] last:!pb-[0px]">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#E6EDFC] border-[1px] border-[#0049E00F] flex items-center justify-center">
                    <OrganizationIcon width={24} height={24} color="#0049E0" />
                  </div>
                  <Link
                    href={`/institutions/${item?.organization?.slug}`}
                    className="group-hover:underline group-hover:text-[#0049E0]"
                  >
                    <span className="text-[16px]">
                      {item?.organization?.name}
                    </span>
                  </Link>
                </div>
              </>
            ))}
          </div>
          {/* ADD TO CALANDERS */}
          <div className="w-[100%] p-[20px] bg-[#ffffff] border-[1px] border-[#E2E8F0] text-[15px] text-center">
            <h5 className="text-[18px] font-semibold mb-[15px]">
              Add To Calendar
            </h5>
            <div className="flex flex-col gap-[10px] items-center">
              {/* GOOGLE CALENDAR */}
              <a
                target="_blank"
                rel="noopener"
                href={generateGoogleCalendarLink({
                  action: "TEMPLATE",
                  dates: "20231215T080000Z/20231218T043000Z",
                  details:
                    "Influential media, entertainment & technology show inspirational speakers including game-changing not just a large-scale conference, but a large educational hub on digital technologies for business, where people communicate, get inspired and find ready-made solutions or business...",
                  location: "IAC Building, USA",
                  text: "Carl Cox Invites Brooklyn in project medical Takeover all Night",
                })}
                className="border-[#0049E01A] border-[1px] px-[14px] py-[8px] rounded-[4px] bg-[#0049E00F] max-w-[175px] w-[100%] flex items-start gap-[10px]"
              >
                <GoogleCalendarIcon width={20} height={20} />
                <span className="text-[#0049E0] text-[14px]">Google</span>
              </a>
              {/* OUTLOOK CALENDAR */}
              <a
                target="_blank"
                rel="noopener"
                href={generateOutlookCalendarLink({
                  allday: false,
                  body: "Influential media, entertainment & technology show inspirational speakers including game-changing not just a large-scale conference, but a large educational hub on digital technologies for business, where people communicate, get inspired and find ready-made solutions or business...",
                  enddt: "2023-12-18T04:30:00+00:00",
                  location: "IAC Building, USA",
                  startdt: "2023-12-15T08:00:00+00:00",
                  subject:
                    "Carl Cox Invites Brooklyn in project medical Takeover all Night",
                })}
                className="border-[#0049E01A] border-[1px] px-[14px] py-[8px] rounded-[4px] bg-[#0049E00F] max-w-[175px] w-[100%] flex items-start gap-[10px]"
              >
                <OutlookCalendarIcon width={20} height={20} />
                <span className="text-[#0049E0] text-[14px]">Outlook</span>
              </a>
              {/* YAHOO CALENDAR */}
              <a
                target="_blank"
                rel="noopener"
                href={generateYahooCalendarLink({
                  desc: "Influential media, entertainment & technology show inspirational speakers including game-changing not just a large-scale conference, but a large educational hub on digital technologies for business, where people communicate, get inspired and find ready-made solutions or business...",
                  dur: "",
                  et: "20231218T043000Z",
                  in_loc: "IAC Building, USA",
                  st: "20231215T080000Z",
                  title:
                    "Carl Cox Invites Brooklyn in project medical Takeover all Night",
                  v: "60",
                })}
                className="border-[#0049E01A] border-[1px] px-[14px] py-[8px] rounded-[4px] bg-[#0049E00F] max-w-[175px] w-[100%] flex items-start gap-[10px]"
              >
                <YahooCalendarIcon width={20} height={20} />
                <span className="text-[#0049E0] text-[14px]">Yahoo</span>
              </a>
              {/* APPLE CALENDAR */}
              <a
                target="_blank"
                rel="noopener"
                className="border-[#0049E01A] border-[1px] px-[14px] py-[8px] rounded-[4px] bg-[#0049E00F] max-w-[175px] w-[100%] flex items-start gap-[10px]"
              >
                <AppleCalendarIcon width={20} height={20} />
                <span className="text-[#0049E0] text-[14px]">Apple</span>
              </a>
              {/* WITH ICS File */}
              <span className="text-center mt-[4px] mb-[4px] opacity-[0.8] text-[14px]">
                Ou Avec
              </span>
              <div
                className="border-[#0049E01A] border-[1px] px-[14px] py-[8px] rounded-[4px] bg-[#0049E00F] max-w-[175px] w-[100%] flex items-center justify-center gap-[10px] cursor-pointer"
                onClick={() => downloadICSFile()}
              >
                <span className="text-[#0049E0] text-[14px]">
                  Download .ics File
                </span>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="w-[100%] p-[20px] bg-[#ffffff] border-[1px] border-[#E2E8F0] text-[15px] text-center">
            <div className="flex flex-wrap gap-[10px]">
              {[
                "Nouveaux médicaments",
                "Cardiologie",
                "Cholestérol élevé",
                "Anatomie",
                "Diabète",
                "DCI cité 1v",
                "Labo cité 1",
              ].map((item) => (
                <>
                  <span className="bg-[#0049E01A] px-[8px] py-[3px] rounded-[4px] text-[#0049E0] text-[14px]">
                    {item}
                  </span>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* SPEAKER */}
      <div className="bg-[#0049E005] w-[calc(100%+60px)] mx-[-30px] px-[30px] py-[30px]">
        <span
          className="block h-[100px] mt-[-100px] invisible"
          id="speakers"
        ></span>
        <div className="flex flex-col gap-[6px] scroll-pt-[60px] mr-[18px] mb-[18px]  ">
          <h4 className="text-[22px] font-semibold">Speakers</h4>
          <p className="text-[15px]">
            Speakers play a pivotal role in shaping our understanding and
            advancing our capabilities
          </p>
        </div>
        <div
          className=" p-[4px] flex flex-wrap gap-[15px]  mr-[-15px]  "
          style={{ rowGap: "25px" }}
        >
          {/* {content?.EventExpert?.map((item: any, _: number) => {
              return (
                 <Fragment key={_}>
                  <ExpertCard 
                    firstName={`${item?.expert?.firstName}`}
                    lastName={`${item?.expert?.lastName}`}
                    photo={defineImageURI(item?.expert?.imagePath)}
                    note={item?.expert?.note}
                    slug={item?.expert?.slug}
                    typeStyle=""
                    // expertises={[{ name: "Pharmacien" }, { name: "Médecin" }]}
                    expertises={
                      item?.expert?.ExpertSpeciality?.map((e: any) => ({
                        name: e?.speciality?.name,
                      })) || []
                    }
                    
                    className="min-w-[245px] text-white"
                  />
                </Fragment>
              );
            })} */}
          {experts?.items?.map((item: any, _: number) => {
            return (
              <Fragment key={_}>
                <ExpertCard
                  firstName={`${item?.firstName}`}
                  lastName={`${item?.lastName}`}
                  photo={defineImageURI(item?.imagePath)}
                  note={item?.note}
                  slug={item?.slug}
                  typeStyle=""
                  // expertises={[{ name: "Pharmacien" }, { name: "Médecin" }]}
                  expertises={
                    item?.ExpertSpeciality?.map((e: any) => ({
                      name: e?.speciality?.name,
                    })) || []
                  }
                  className="min-w-[245px] text-white"
                />
              </Fragment>
            );
          })}
          {experts.meta.totalItems > 10 && (
            <div className="p-[20px] w-[100%]">
              {/* pagination of list */}
              <DefaultPaginate
                initPage={experts.meta?.currentPage - 1 || 0}
                totalPages={experts.meta?.totalPages || 0}
                isDark={false}
                payload={handleChangePage1}
              />
            </div>
          )}
        </div>
      </div>
      {/*  */}
      <div>
        <span
          className="block h-[100px] mt-[-100px] invisible"
          id="organisateurs"
        ></span>
      </div>
      {/* EVENTS */}
      <div className="bg-[#0049E000] w-[calc(100%+60px)] mx-[-30px] px-[30px] py-[30px] mt-[-30px]">
        <span
          className="block h-[100px] mt-[-100px] invisible"
          id="trials"
        ></span>
        <div className="flex flex-col gap-[6px] scroll-pt-[60px] mb-[18px]">
          <h4 className="text-[22px] font-semibold">Extrait du congrès</h4>
          <p className="text-[15px]">
            Play a pivotal role in shaping our understanding and advancing our
            capabilities
          </p>
        </div>

        <div
          className=" p-[4px] flex flex-wrap gap-[15px]  mr-[-15px]"
          style={{ rowGap: "25px" }}
        >
          {detail?.data.items?.map((item: any, _: number) => {
            return (
              <Fragment key={_}>
                <EventCard
                  id={item?.id}
                  title={item?.title}
                  slug={item?.slug}
                  publishedAt={item?.createdAt}
                  thunbnail={item?.imagePath}
                  isBookmarked={item?.isBookmarked}
                  paddingBottom={calculateHeight(300, 165)}
                  item={item}
                  bookmarked={false}
                  //
                  country={content?.city?.country?.flag}
                  city={`${content?.city?.name}, ${content?.city?.country?.name_fr}`}
                />
              </Fragment>
            );
          })}
          {detail.data.meta.totalItems > 8 && (
            <div className="p-[20px] w-[100%]">
              {/* pagination of list */}
              <DefaultPaginate
                initPage={detail.data.meta?.currentPage - 1 || 0}
                totalPages={detail.data.meta?.totalPages || 0}
                isDark={false}
                payload={handleChangePage}
              />
            </div>
          )}
        </div>
      </div>
      {/* REVIEWS */}
      <div className="bg-[#0049E005] w-[calc(100%+60px)] mx-[-30px] px-[30px] py-[30px] mb-[-30px]">
        <Reviews
          reviews={{
            range: content?.reviews,
            count: content?.reviewsCount,
            content: content?.EventReview?.map((item: any, index: number) => ({
              ...item?.review,
            })),
          }}
          payload={onSendReview}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  setContext(context);
  const { query } = context;
  const { slug, id, page, pageExperts } = query;
  const { data, status } = await getEventBySlug(slug);
  const detail: any = data
    ? await getEventDetailById(data?.data.id, page ? page : 1) // si on le data qui n'est pas undifuend
    : await getEventDetailById(id, page ? page : 1); // sinon on utilise le query id
  const experts: any = data
    ? await getExpertsByIdEvent(data?.data?.id, pageExperts ? pageExperts : 1) // si on le data qui n'est pas undifuend
    : await getExpertsByIdEvent(id, pageExperts ? pageExperts : 1); // sinon on utilise le query id
  console.log(experts , "experts")
    return {
    props: {
      content: data?.data,
      currentSlug: slug,
      detail: detail?.data,
      experts: experts.data?.data,
    },
  };
}

export default Page;

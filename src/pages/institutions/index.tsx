import api, { setContext } from "@/_v1/api/api";
import { Breadcrumb, DefaultPaginate, SearchFilter } from "../../_v1/components";
import { FullPath } from "@/_v1/lib/utils";
import { Divider } from "@mantine/core";
import { IconArrowLeft, IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";
import { GetServerSideProps } from "next";
import { fetchInstitution } from "@/_v1/services/organizations";
import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import Button from "@/_v1/components/Buttons/Button";
import { nothingFoundLottie } from "../series";

export const ResumeComponent = ({ resume }: { resume: string }) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === "tag" && domNode.name === "a") {
        return (
          <a style={{ color: "blue" }} href={domNode.attribs.href}>
            {domToReact(domNode.children, options)}
          </a>
        );
      } else if (domNode.type === "tag" && domNode.name === "p") {
        return (
          <p
            className="line-clamp-5 lg:line-clamp-3 xl:line-clamp-4"
            style={{
              lineHeight: "24px",
              color: "#1E293D",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            {domToReact(domNode.children, options)}
          </p>
        );
      }
      return null;
    },
  };

  return <div>{parse(resume, options)}</div>;
};

type Props = {
  institutions: any;
};

const Index = ({ institutions }: Props) => {
  const [insitutionData, setInstitutionData] = useState<any>([]);
  const { pathname, query, push } = useRouter();
  const [page, setPage] = useState(2);
  const [isFollowed, setIsFollowed] = useState(false);
  const { back } = useRouter();

  // useEffect(() => {
  //     const fetchInstitution = async () => {
  //         try {
  //           const res = await api.get(`/organization?page=${query.page ? query.page : ""}&perPage=9`);
  //           setInstitutionData(res.data)
  //         } catch (error) {
  //             console.log(error)
  //         }
  //     }
  //     fetchInstitution()
  // }, [query])

  // handle pages
  const handleChangePage = (targetPage: number) => {
    setPage(targetPage);

    push({
      pathname: "institutions",
      query: {
        ...query,
        page: targetPage,
      },
    });
    document?.getElementById("header-id")?.scrollIntoView(); //{ behavior: "smooth" }
  };

  console.log(institutions.items.length);

  return (
    <>
      <div
        className="px-[26px] flex flex-col "
        style={{ gap: "15px" }}
      >
        {/* Breadcrumb => institutions */}
        <Breadcrumb items={[{ name: "Institut", path: "/institutions" }]} />

        <SearchFilter
          num={3}
          // withProfile
          withKeywords
          withInstitution
          withSpecialities
        />
        {/* list of institutions */}
        {institutions?.items?.length > 0 ? (
          <>
            <div
              className="  p-[4px] flex flex-wrap gap-[26px]  mr-[-26px] min-h-[650px]"
              style={{ rowGap: "15px" }}
            >
              {institutions?.items?.map((item: any) => (
                <div
                  key={item._id}
                  className="  px-[30px] py-[32px] relative overflow-hidden group h-[270px] flex flex-col  gap-[13px]  bg-white hover:shadow-note transition-all
                          3xl:max-w-[calc(25%-26px)] 2xl:max-w-[calc(33.33%-26px)] xl:max-w-[calc(33.33%-26px)] lg:max-w-[calc(33.33%-26px)] md:max-w-[calc(50%-26px)] sm:max-w-[calc(100%-26px)] w-[calc(100%-26px)] hover:cursor-pointer 
                          border border-solid border-[#E2E8F0]-500 rounded-[4px]"
                >
                  <div className="flex gap-[29px] ">
                    <img
                      src={
                        item.imagePath
                          ? FullPath(item.imagePath)
                          : "/assets/images/institution.svg"
                      }
                      alt=""
                      className="w-[53px] h-[40px] object-contain "
                    />
                    <div className="flex flex-col gap-[1px] mt-[2px] ">
                      <Link href={`/institutions/${item.slug}`}>
                        <h4 className="text-[#1E293B] max-w-[180px] text-[15px] font-[600] leading-[20px] hover:underline ">
                          {" "}
                          {item.name}{" "}
                        </h4>
                      </Link>
                      <span className="text-[#94A3B8] text-[11.5px] font-[400] leading-[21px] tracking-[0.5px] ">
                        {item.note}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-[35px] items-center">
                    <div className="flex gap-[4.5px] items-center">
                      <span className="text-[#1E293B] text-[15.5px] leading-[22px] font-[600] ">
                        1512
                        <b className="text-[#94A3B8] font-[500] ml-[2px]">
                          {" "}
                          Notes{" "}
                        </b>
                      </span>
                    </div>
                    <div className="flex gap-[4.5px] items-center">
                      <span className="text-[#1E293B] text-[15.5px] leading-[22px] font-[600] ">
                        38.3K
                        <b className="text-[#94A3B8] font-[500] ml-[2px]">
                          {" "}
                          Modules{" "}
                        </b>
                      </span>
                    </div>
                    <div className="flex gap-[4.5px] items-center">
                      <span className="text-[#1E293B] text-[15.5px] leading-[22px] font-[600] ">
                        329
                        <b className="text-[#94A3B8] font-[500] ml-[2px]">
                          {" "}
                          Followers{" "}
                        </b>
                      </span>
                    </div>
                  </div>
                  <div>
                    <ResumeComponent resume={item.resume} />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-[20px]">
              {/* pagination of list */}
              <DefaultPaginate
                initPage={institutions.meta?.currentPage - 1}
                totalPages={institutions.meta?.totalPages}
                isDark={false}
                payload={handleChangePage}
              />
            </div>
          </>
        ) : (
          <div className="flex min-h-[600px]">
            <div className="relative  w-full h-[600px] flex justify-center items-center">
              <div className=" flex flex-col justify-center items-center">
                <div className="pointer-events-none w-[200px]">
                  <LottieAnimation loop animationData={nothingFoundLottie} />
                </div>
                <div className="flex items-center flex-col gap-4">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <h2 className="text-[22px] text-center font-[500] w-full">
                      No results found
                    </h2>
                    <p className="text-center text-[#484f59]">
                      Try updating your search term or filters, or check out
                      these popular searches:
                    </p>
                  </div>
                  <Button
                    onClick={back}
                    className="bg-primary-normal px-[40px] hover:bg-primary-normal/10 hover:text-primary-normal  hover:border-primary-normal py-2 text-white border border-primary-normal/10"
                  >
                    <IconArrowLeft
                      stroke={1.4}
                      className="w-[19px] transition-all group-hover:translate-x-1 mr-1"
                    />
                    Go back
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  const { institution, speciality, keyWords } = query;

  console.log(speciality, "speciality");
  const institutions: any = await fetchInstitution(
    Number(query.page),
    institution || "",
    speciality,
    keyWords
  );

  return {
    props: { institutions: institutions.data },
  };
};

export default Index;

import api, { setContext } from "@/_v1/api/api";
import { Breadcrumb, DefaultPaginate, SearchFilter } from "../../_v1/components";
import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import Button from "@/_v1/components/Buttons/Button";
import { FullPath } from "@/_v1/lib/utils";
import { fetchExperts, getExpertsBySlug } from "@/_v1/services/experts";
import { Divider } from "@mantine/core";
import { IconArrowLeft, IconInfoCircle } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { nothingFoundLottie } from "../series";

type Props = {
  experts: any;
};



const Index = ({ experts }: Props) => {
  const [expertData, setExpertData] = useState<any>({});
  const { pathname, query, push } = useRouter();
  const [page, setPage] = useState(2);
  const { back } = useRouter();

console.log(typeof experts  , "typeOf");



  // handle pages
  const handleChangePage = (targetPage: number) => {
    setPage(targetPage);

    push({
      pathname: "experts",
      query: {
        ...query,
        page: targetPage,
      },
    });
  };
  console.log(experts, "setExperts");
  return (
    <div className="px-[25px] flex flex-col " style={{ gap: "15px" }}>
      {/* Breadcrumb => experts */}
      <Breadcrumb items={[{ name: "Experts", path: "/experts" }]} />
      <SearchFilter num={3} withKeywords withProfileExpert withSpecialities />
      {/* list of exeperts */}
      {experts?.items?.length > 0 ? (
        <>
          <div
            className="  p-[4px] flex flex-wrap gap-[15px]  mr-[-15px]"
            style={{ rowGap: "25px" }}
          >
            {experts?.items?.map((item: any) => (
              <div
                key={item._id}
                className=" relative overflow-hidden group h-[428px] flex flex-col justify-between gap-2 py-[15px]  bg-white hover:shadow-note transition-all
                    2xl:max-w-[calc(20%-15px)] xl:max-w-[calc(20%-15px)] lg:max-w-[calc(25%-15px)] md:max-w-[calc(33.33%-15px)] sm:max-w-[calc(50%-15px)] w-[calc(100%-15px)] hover:cursor-pointer "
              >
                <Link href={`/experts/${item.slug}`}>
                  <img
                    src={FullPath(item.imagePath)}
                    alt="expert photo"
                    className="w-[100%] absolute top-[0px] left-[0px] h-[100%] object-cover "
                  />
                  <div className=" flex flex-col gap-[7px] badges -translate-x-[100px] opacity-0 duration-[.4s] ease-in-out group-hover:opacity-100 group-hover:translate-x-0 absolute top-2 flex flex-col gap-1 items-start ">
                    <span className=" w-[max-content] text-[white] text-[14px] font-[400] leading-[21px] px-[10px] py-[4px] bg-[#0049E0] z-[2] relative ">
                      Pharmacien
                    </span>
                    <span className=" w-[max-content] text-[white] text-[14px] font-[400] leading-[21px] px-[10px] py-[4px] bg-[#0049E0] z-[2] relative ">
                      Médecin
                    </span>
                  </div>
                  <div className="absolute w-full  flex text-white gap-3 flex-col items-center justify-center duration-[.4s] ease-in-out transition-all group-hover:bottom-5 bottom-[-53px]  name-profession">
                    <h1 className="name font-[900] text-[40px] uppercase text-center leading-[40px] mx-[5px] ">
                      {item.firstName} <br /> {item.lastName}
                    </h1>
                    <div className="flex items-center opacity-0 duration-[.4s] ease-in-out group-hover:opacity-100 justify-center w-full">
                      <Divider
                        orientation="horizontal"
                        size={"3.5px"}
                        className=" w-[16px]"
                        color="white"
                      />
                    </div>
                    <span className="text-center  leanding-[17px] opacity-0 duration-[.4s] ease-in-out group-hover:opacity-100 tracking-[0.9px] max-w-[172px] mx-10px text-[14px] text-[white]">
                      {item?.note}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="p-[20px]">
            {/* pagination of list */}
            <DefaultPaginate
              initPage={experts.meta?.currentPage - 1 || 0}
              totalPages={experts.meta?.totalPages}
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
                    Try updating your search term or filters, or check out these
                    popular searches:
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
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  const { page, keyWords, expert, speciality } = query;

  const experts: any = await fetchExperts(
    Number(page),
    expert,
    speciality,
    keyWords
  );

  return {
    props: { experts: experts.data },
  };
};

export default Index;

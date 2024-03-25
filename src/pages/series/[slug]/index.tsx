import api, { setContext } from "@/_v1/api/api";
import { Serie } from "@/_v1/api/serie";
import Breadcrumb from "@/_v1/components/breadcrumb/Breadcrumb";
import DataArea from "@/_v1/components/series/components/slug/DataArea";
import ReviewsArea from "@/_v1/components/series/components/slug/ReviewsArea";
import {
  Experts,
  Institutions,
  Keywords,
  Modules,
  Organizations,
} from "@/_v1/components/series/components/slug/components";
import Details from "@/_v1/components/series/components/slug/components/Detail";
import Error from "@/pages/_error";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Index({
  Serie,
  errorCode,
}: {
  Serie: Serie;
  errorCode: number | null;
}) {
  const { asPath } = useRouter();
  const myRef = useRef<HTMLDivElement>(null);
  const executeScroll = () => myRef?.current?.scrollIntoView();
  const [InnerWidth, setInnerWidth] = useState<number>();
  const items = [
    { title: "Series", href: "/series" },
    { title: Serie.title, href: asPath },
  ].map((item, index) => (
    <Link className="hover:underline" href={item.href} key={index}>
      {item.title}
    </Link>
  ));
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [InnerWidth]);
  
  if (errorCode) {
    return (
      <Error
        message={`The requested Serie is not available.`}
        description={`Please update your search or filters, or explore other options below.`}
      />
    );
  } else {
    return (
      <>
        <Head>
          <title>{Serie.title} • Meducate Series </title>
        </Head>
        <div className="relative  pt-[10px]">
          <Breadcrumb items={items} />
          <div className="relative px-4 Note-container w-full min-h-[1000px] mb-5 flex  gap-[30px] ">
            <div className="w-[calc(100%-300px)] w1100:w-full ">
              <div className="w-full min-h-[1000px] bg-white pt-[10px] pb-[20px] rounded-[6px] border">
                <DataArea
                  scrollToComments={executeScroll as () => void}
                  serie={Serie}
                />
              </div>
            </div>
            <div className="relative h-auto w1100:hidden">
              <div className="w-[300px] sticky top-[80px]  transition-all ">
                <div className="sticky-container w-full flex flex-col gap-3">
                  <Organizations data={Serie.SeriePartner} />
                  <Institutions data={Serie.SerieOrganization} />
                  <Details {...Serie} profession={Serie.SerieProfession} />
                  <Keywords SerieHashTag={Serie.SerieHashTag} />
                </div>
              </div>
            </div>
          </div>
          <div className="px-[20px]">
            {Serie.SerieModule.length > 0 && (
              <Modules
                innerWidth={Number(InnerWidth)}
                modules={Serie.SerieModule}
              />
            )}
            {Serie.SerieExpert.length > 0 && (
              <Experts
                innerWidth={Number(InnerWidth)}
                experts={Serie.SerieExpert}
              />
            )}
          </div>
          <div ref={myRef}>
            <ReviewsArea id={Serie.id} reviews={Serie.SerieReview} />
          </div>
        </div>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  try {
    const { data } = await api.get<Serie>(`/serie/${query?.slug}`);
    return {
      props: {
        Serie: data,
        errorCode: null,
      },
    };
  } catch (error: any) {
    if ((error.response && error.response.status === 400) || 404) {
      return {
        props: {
          Serie: {},
          errorCode: error.response.status,
        },
      };
    }
    return {
      props: {
        Serie: {},
      },
    };
  }
};

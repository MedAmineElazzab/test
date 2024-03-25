import { Meta } from "@/@types";
import api, { setContext } from "@/_v1/api/api";
import { Note } from "@/_v1/api/note";
import { Serie } from "@/_v1/api/serie";
import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import Button from "@/_v1/components/Buttons/Button";
import Breadcrumb from "@/_v1/components/breadcrumb/Breadcrumb";
import { SerieCard } from "@/_v1/components/series";
import FiltersHeader from "@/_v1/components/static/FiltersHeader";
import { Pagination } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
export const nothingFoundLottie = require("@public/assets/animations/empty-search.json");

const items = [{ title: "Series", href: "" }].map((item, index) => (
  <Link className="hover:underline" href={item.href} key={index}>
    {item.title}
  </Link>
));
export default function Index({
  Series,
}: {
  Series: { data: Serie[]; meta: Meta };
}) {
  const { push, query, back } = useRouter();

  return (
    <>
      <Head>
        <title>
          Meducate Series • Explorez notre base de connaissances médicales avec
          des modules, vidéos et quiz
        </title>
      </Head>
      
      <div className="relative mt-2">
        <Breadcrumb items={items} />
        <div className="px-4">
          <FiltersHeader
            num={4}
            withProfile
            withKeywords
            withPathologies
            withSpecialities
          />
          <div className="flex min-h-[600px]">
            {Series.data.length == 0 ? (
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
            ) : (
              <div className="notes-container relative mt-[30px] h-fit w-full gap-x-3 gap-y-6  grid  min1920:grid-cols-6 grid-cols-5 w1500:grid-cols-4  w1300:grid-cols-3 w1100:grid-cols-2 w800:!grid-cols-1">
                {Series?.data?.map((serie, index) => {
                  return <SerieCard key={index} {...serie} />;
                })}
              </div>
            )}
          </div>
          {Series?.data?.length > 0 && (
            <div className="pagination flex justify-center items-center p-4">
              <Pagination
                onChange={(page) => {
                  push({
                    query: {
                      ...query,
                      page: page,
                    },
                  });
                }}
                sx={{
                  [".mantine-Pagination-control"]: {
                    borderRadius: "50%",
                    border: "none",
                    fontWeight: 500,
                  },
                  [".mantine-123a78k"]: {
                    backgroundColor: "#fff !important",
                    color: "#004be090",
                    border: "1px solid  #004be090",
                  },
                  [".mantine-Pagination-control[data-active]"]: {
                    backgroundColor: "#0049e0",
                  },
                  [".mantine-Pagination-control[data-active]:not([data-disabled]):hover"]:
                    {
                      backgroundColor: "#004be0ec",
                    },
                }}
                total={Series.meta.totalPages || 0}
                siblings={2}
                defaultValue={Series.meta.currentPage || 1}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  const page = query?.page || 1;
  const perPage = query?.perPage || 15;
  const sortBy = query?.sortBy || "id";
  const sortOrder = query?.sortOrder || "desc";
  const categoryId = query?.category || null;
  const specialityId = query?.speciality || null;
  const diseaseId = Number(query?.disease) || null;
  const professionId = Number(query?.profil) || null;
  const search = query?.keyWords || null;
  const date = query?.date;


  try {

    const { data, config } = await api.get<{
      items: Note[];
      meta: Meta;
    }>(`/serie`, {
      params: {
        page,
        perPage,
        sortBy,
        sortOrder,
        categoryId,
        specialityId,
        diseaseId,
        search,
        createdAt: date || null,
        professionId,
      },
    });
    return {
      props: {
        Series: {
          data: data.items,
          meta: data.meta,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        Series: {
          data: [],
          meta: {},
        },
      },
    };
  }
};

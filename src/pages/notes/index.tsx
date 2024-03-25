import { Meta } from "@/@types";
import api, { setContext } from "@/_v1/api/api";
import { Note } from "@/_v1/api/note";
import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import Button from "@/_v1/components/Buttons/Button";
// import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
// import { NoteCard } from "@/components/notes";
import { Breadcrumb, NoteCard } from "../../_v1/components";
import FiltersHeader from "@/_v1/components/static/FiltersHeader";
import { Pagination } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
export const nothingFoundLottie = require("@public/assets/animations/empty-search.json");

const items = [{ title: "Notes", href: "#" }].map((item, index) => (
  <Link className="hover:underline" href={item.href} key={index}>
    {item.title}
  </Link>
));
export default function Index({
  Notes,
}: {
  Notes: { data: Note[]; meta: Meta };
}) {
  const { push, query, back } = useRouter();

  console.log(Notes.data, "item");

  return (
    <>
      <Head>
        <title>
          Meducate Notes • Explorez notre base de connaissances médicales
        </title>
      </Head>
      <div className="relative  mt-2">
        {/* <Breadcrumb items={items} /> */}
        <div className="px-[24px]">
          <Breadcrumb items={[{ name: "Notes", path: "/notes" }]} />
          <div className="sticky top-[122px] z-[100] bg-[#F3F4F8] ">
            <FiltersHeader
              num={5}
              withCategories
              withDate
              withKeywords
              withPathologies
              withSpecialities
            />
          </div>

          <div className="flex min-h-[600px] mr-[-16px]"> 
            {Notes.data.length == 0 ? (
              <div className="relative  w-full h-[600px]  flex justify-center items-center">
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
              <div className="notes-container relative mt-[24px] h-fit  w-full gap-[16px] flex flex-wrap    ">
                {Notes?.data?.map((note: any, index) => {
                  // return <NoteCard key={index} {...note} />;
                  return (
                    <NoteCard
                      id={note?.id}
                      title={note?.title}
                      slug={note?.slug}
                      date={""}
                      content={note?.content}
                      isBookmarked={note?.isBookmarked}
                      noteLevel={note?.noteLevel?.name}
                      expert={note?.expert?.expert}
                      noteExpert={note?.noteExpert?.expert}
                      disease={note?.NoteDisease}
                      tags={[
                        { type: "level", ...note?.noteLevel },
                        { type: "speciality", ...note?.speciality },
                        // { type: "category", ...note?.category },
                        // { type: "medicine", ...note?.medicine },
                        // { type: "dci", ...note?.dci },
                        // { type: "type", ...note?.noteType },
                        // { type: "pathology", ...note?.pathology },
                      ]}
                      key={index}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="pagination flex justify-center items-center p-4">
            {Notes.data.length > 0 && (
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
                total={Notes.meta.totalPages || 0}
                siblings={2}
                defaultValue={Notes.meta.currentPage || 1}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  const page = query?.page || 1;
  const perPage = query?.perPage || 12;
  const sortBy = query?.sortBy || "id";
  const sortOrder = query?.sortOrder || "desc";
  const categoryId = query?.category || null;
  const specialityId = query?.speciality || null;
  const diseaseId = Number(query?.disease) || null;
  const search = query?.keyWords || null;
  const date = query?.date;
  try {
    const { data, config } = await api.get<{
      items: Note[];
      meta: Meta;
    }>(`/note`, {
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
      },
    });
    return {
      props: {
        Notes: {
          data: data.items,
          meta: data.meta,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        Notes: {
          data: [],
          meta: {},
        },
      },
    };
  }
};
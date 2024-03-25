import { Note } from "@/_v1/api/note";
import { usePDF } from "react-to-pdf";

import { FavouriteCircledIcon, LogoMeducate } from "@/_v1/icons";
import { notifications } from "@mantine/notifications";
import {
  DocumentsArea,
  ExpertArea,
  Header,
  Infos,
  SourcesArea,
  Summary,
} from "./index";
import HeaderNote from "./HeaderNote";



export default function DataArea({
  note,
  scrollToComments,
}: {
  note: Note;
  scrollToComments: any;
}) {
  const { toPDF, targetRef } = usePDF();

  return (
    <>
      <div className="flex flex-col ">
        <Header
          scrollToComments={scrollToComments}
          {...note}
          onPdfPrintClick={async () => {
            try {
              notifications.show({
                id: "generating",
                title: (
                  <span className="font-bold">You PDF is being generated</span>
                ),
                message: (
                  <span>
                    Your pdf is being generated please wait as we prepare it for
                    you.
                  </span>
                ),
                icon: <FavouriteCircledIcon className="w-[40px] text-white" />,
                autoClose: 4000,
                styles: {
                  icon: {
                    width: "2.75rem",
                    height: "2.75rem",
                    background: "#0049E0",
                  },
                },
                loading: true,
              });
              const toHide = targetRef?.current?.querySelectorAll(".toHide");
              const toShow = targetRef?.current?.querySelectorAll(".toShow");
              if (toHide) {
                (toHide as []).forEach((el: any) => {
                  el.style.display = "none";
                });
              }
              if (toShow) {
                (toShow as []).forEach((el: any) => {
                  el.style.display = "flex";
                });
              }
              toPDF({
                method: "save",
                filename: note.title + ".pdf",
                page: {
                  margin: {
                    bottom: 5,
                    left: 10,
                    right: 10,
                    top: 5,
                  },
                },

                resolution: 2,
              });
              (toHide as []).forEach((el: any) => {
                el.style.display = "flex";
              });
              (toShow as []).forEach((el: any) => {
                el.style.display = "none";
              });
            } catch (error) {
              console.log(error);
            }
          }}
        />

        <HeaderNote
          slug={note.slug}
          isBookmarked={note.isBookmarked}
          title={note.title}
          createdAt={note.createdAt}
          id={note.id}
          reviews={note.reviews}
          views={note.views}
          isFlagged={note.isFlagged}
          summary={note.summary}
          noteType={note.noteType}
        />
        <div className="p-[8px] sticky top-[320px] bg-[#F3F4F8] z-[40] "></div>
        <div
          ref={targetRef}
          style={{ boxShadow: "rgba(0, 0, 0, 0.01) 0px 1px 4px" }}
          className="flex justify-center flex-col items-center bg-[white] p-[16px] rounded-[8px] gap-[16px]"
        >
          <LogoMeducate className="w-[300px] toShow hidden mb-4 " />
          <Summary summary={note.summary} />
          <Infos {...note} />
          <ExpertArea NoteExpert={note.noteExpert} noteSlug={note.slug} />
          <SourcesArea source={note.source} />
          <DocumentsArea Attachement={note.Attachement} />
        </div>
      </div>
    </>
  );
}

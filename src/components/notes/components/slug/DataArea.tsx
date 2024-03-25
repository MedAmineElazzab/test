import { LogoMeducate } from "@/_v1/icons";
import { Note } from "@/api";
import {
  CommentsArea,
  DocumentsArea,
  HeaderDetailedNote,
  NoteDetails,
  SourcesArea,
  Summary,
} from "@/components";
import { ModuleTitles } from "@/enum";

export function DataArea({ note }: { note: Note }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <HeaderDetailedNote
          slug={note.slug}
          isBookmarked={note.isBookmarked}
          title={note.title}
          createdAt={note.createdAt}
          id={note.id}
          reviews={note.reviews.length}
          views={note.views}
          isFlagged={note.isFlagged}
          noteType={note.noteType}
        />
        <div
          className="flex justify-center shadow-data-area flex-col items-center bg-white p-4 rounded-2 gap-4"
        >
          <LogoMeducate className="w-300 toShow hidden mb-4" />
          <Summary summary={note.summary} />
          <NoteDetails {...note} />
          <SourcesArea source={note.source} />
          <DocumentsArea Attachement={note.Attachement} />
        </div>
        <div className="w-full p-5">
          <CommentsArea
            total={note.reviews.length}
            slug={note.slug}
            id={note.id}
            type={ModuleTitles.NOTE}
          />
        </div>
      </div>
    </>
  );
}

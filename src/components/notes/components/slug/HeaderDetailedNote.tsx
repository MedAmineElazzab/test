import { noteTypes } from "@/api";
import {
  Badge,
  FlagButton,
  ModuleHeaderBottomSection,
  SaveButton,
  SectionCardLayout,
} from "@/components";
import { ModuleTitles, NoteType, ModulesPathnames } from "@/enum";
import { handleNoteBokmarking, handleNoteFlagging } from "@/services";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

interface HeaderDetailedNoteProps {
  slug: string;
  isBookmarked: boolean;
  id: number;
  isFlagged: boolean;
  title: string;
  createdAt: string;
  reviews: number;
  views: number;
  noteType: noteTypes;
}
export function HeaderDetailedNote({
  slug,
  isBookmarked,
  title,
  createdAt,
  id,
  reviews,
  views,
  isFlagged,
  noteType,
}: HeaderDetailedNoteProps) {
  const { push } = useRouter();

  const HandleSavingClick = (isSaved: boolean) => {
    handleNoteBokmarking(slug, isSaved);
  };
  const HandleFlagingClick = (isFlagged: boolean) => {
    handleNoteFlagging(slug, isFlagged);
  };
  const handleCategoryPush = () => {
    push({
      pathname: ModulesPathnames.NOTE,
      query: {
        category: noteType,
      },
    });
  };
  return (
    <SectionCardLayout title={ModuleTitles.NOTE}>
      <div className="px-3 flex flex-col gap-1 relative w-full">
        <div className="h-12 relative pt-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Badge color="secondary" variant="filled" size="md">
              {`Note N°${id}`}
            </Badge>
            <Badge
              color="primary"
              variant="outline"
              withHover
              clickable
              size="md"
              onClick={handleCategoryPush}
            >
              {noteType && NoteType[noteType]}
            </Badge>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <FlagButton isFlagged={isFlagged} onClick={HandleFlagingClick} />
              <SaveButton
                isBookmarked={isBookmarked}
                onClick={HandleSavingClick}
              />
            </div>
          </div>
        </div>
        <div className="min-h-13 flex items-center">
          <h1 className="capitalize-first text-3xl text-primary-darker font-bold">
            {title}
          </h1>
        </div>
        <div className="flex gap-10 items-center">
          <ModuleHeaderBottomSection
            comments={reviews}
            date={createdAt}
            vues={views || 0}
          />
        </div>
      </div>
    </SectionCardLayout>
  );
}

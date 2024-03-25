import { Note } from "@/api";
import { Box, NoteDetailsField } from "@/components";
import { useNoteDetails } from "@/hooks";

export function NoteDetails(note: Note) {
  const NotesFields = useNoteDetails({ ...note });
  return (
    <Box className="border border-gray-100 rounded w-full py-10 px-8 gap-8 flex flex-col ">
      {NotesFields?.map((el, index) => {
        return <NoteDetailsField key={index + note.slug} {...el} />;
      })}
    </Box>
  );
}

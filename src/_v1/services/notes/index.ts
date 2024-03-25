import api from "@/_v1/api/api";

export const onBookMarkNotesBySlug = async (slug: string) => {
  try {
    return await api?.patch(`/note/bookmark/${slug}`);
  } catch (err) {
    console.log("ERROR CATCHED ON BOOKMARK: POST: /note/bookmark/:slug");
  }
};

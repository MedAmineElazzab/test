import api from "@/_v1/api/api";

export const onBookMarkModulesBySlug = async (slug: string) => {
  try {
    return await api?.patch(`/module/bookmark/${slug}`);
  } catch (err) {
    console.log("ERROR CATCHED ON BOOKMARK: POST: /module/bookmark/:slug");
  }
};

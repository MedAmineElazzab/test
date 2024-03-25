import api from "@/_v1/api/api";
import {
  defineImageURI,
  defineVideoURI,
  reformatChapters,
  reformatSubtitles,
} from "../../functions";

export const getMasterClassesWithPagination = async (
  page: number,
  limit: number,
  lang: string
) => {
  try {
    const { data } = await api.get(
      `/masterclass?page=${page}&perPage=${limit}&sortBy=createdAt&sortOrder=desc&language=${lang}`
    );
    if (data?.meta?.itemCount === 0) return { status: 404, data: undefined };
    return { status: 200, data: data };
  } catch (error) {
    console.log("ERROR CATCHED ON FETCHING: GET: /masterclass");
  }
};

export const getMasterClassesBySlug = async (slug: string  , lang:any ) => {
  try {
    const { data } = await api.get(`/masterclass/${slug}`);
    const videoType = data.isJoined ? "VIDEO" : "TRAILER";
    const videoPath = data.isJoined ? data?.videoPath : data?.trailerPath;
    const videoThumbnail = data.isJoined
      ? data?.thumbnailVideo
      : data?.thumbnailTrailer;

    const v = data?.Transcription?.filter((e: any) => e.type === 'VIDEO'); // video subtitles
    const c = data?.Transcription?.filter((e: any) => e.type === "CHAPTER"); // video chapter
    const t = lang ? 
               v?.find((e: any) => e.language === lang)?.transcriptionJson 
            :  v[0]?.transcriptionJson 

    return {
      data: {
        data: data,
        video_subtitles: reformatSubtitles(v),
        video_chapters: data.isJoined ? reformatChapters(c) : [],
        video_transcription: t.filter((e: any) => e.text !== ""),
        video_path: defineVideoURI(videoPath),
        video_thumbnail: defineImageURI(videoThumbnail),
        video_token: data?.videoPathToken,
      },
      status: 200,
    };
  } catch (error) {
    console.log("ERROR CATCHED ON SENDING: POST: /masterclass/:slug",error);
    return { data: undefined, status: 404 };
  }
};

export const onBookMarkMasterClassesBySlug = async (slug: string) => {
  try {
    return await api?.patch(`/masterclass/bookmark/${slug}`);
  } catch (err) {
    console.log("ERROR CATCHED ON BOOKMARK: POST: /masterclass/bookmark/:slug");
  }
};

export const onJoinToMasterClassesBySlug = async (slug: string) => {
  try {
    return await api?.put(`/masterclass/join/${slug}`);
  } catch (error) {
    console.log("ERROR CATCHED ON JOIN: POST: /masterclass/:slug");
  }
};

export const sendMasterClassesQuestions = async (
  slug: string,
  questions: (string | undefined)[]
) => {
  try {
    return await api.post(`/masterclass/questions/${slug}`, {
      question: questions,
    });
  } catch (error) {
    console.log("ERROR CATCHED ON SENDING: POST: /masterclass/questions/:slug");
  }
};


export const onBookMarkCongresBySlug = async (slug: string) => {
  try {
      return await api?.patch(`/event/bookmark/detail/${slug}`);
  
  } catch (err) {
    console.log("ERROR CATCHED ON BOOKMARK: POST: /masterclass/bookmark/:slug");
  }
};
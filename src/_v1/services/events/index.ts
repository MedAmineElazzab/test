import api from "@/_v1/api/api";
import { defineImageURI, defineVideoURI, reformatChapters, reformatSubtitles } from "../../functions";

export const getEventsWithFilters = async (
  page: number,
  limit: number,
  filters: any,
  lang: string
) => {
  try {
    let { country, speciality, category, pathology, dateStart, dateEnd } =
      filters;
    let strQuery = "";

    if (country) strQuery += `&countryId=${country}`;
    if (speciality) strQuery += `&specialityId=${speciality}`;
    if (pathology) strQuery += `&pathologyId=${pathology}`;
    if (category) strQuery += `&categoryId=${category}`;
    if (dateStart) strQuery += `&startDate=${dateStart}`;
    if (dateEnd) strQuery += `&endDate=${dateEnd}`;

    let link = `/event?page=${page}&perPage=${limit}&sortBy=createdAt&sortOrder=desc&language=${lang}${strQuery}`;

    // console.log(link);

    const { data } = await api.get(link);
    if (data?.meta?.itemCount === 0) return { status: 404, data: undefined };
    return { status: 200, data: data };
  } catch (error) {
    console.log("ERROR CATCHED ON FETCHING: GET: /masterclass");
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    const { data } = await api.get(`/event/${slug}`);
    console.log(data , "data")
    return {
      data: {
        data: data,
      },
      status: 200,
    };
  } catch (error) {
    console.log("ERROR CATCHED ON SENDING: POST: /masterclass/:slug");
    return { data: undefined, status: 404 };
  }
};

export const getEventDetailById = async (id:any , page:any) => {
  try {
    const { data } = await api.get(`/event/detail?eventId=${id}&page=${page}&perPage=8`);
    
    return {
      data: {
        data: data,
      },
      status: 200,
    };
  } catch (error) {
    return { data: undefined, status: 404 };
  }
};

export const getExpertsByIdEvent = async (id:Number , page:Number) => {
  try {
    const { data } = await api.get(`/expert?eventId=${id}&page=${page}&perPage=10&name=`);
    console.log(data  , "data of experts")
    return {
      data: {
        data: data,
      },
      status: 200,
    };
  } catch (error) {
    console.log("this the error",error)
    return { data: undefined, status: 404 };
  }
};

export const onBookMarkEventBySlug = async (slug: string) => {
  try {
    return await api?.patch(`/event/bookmark/${slug}`);
  } catch (err) {
    console.log("ERROR CATCHED ON BOOKMARK: POST: /event/bookmark/:slug");
  }
};

type EventReview = {
  text: string;
  name: string;
  email: string;
  rate: number;
};
export const onSendReviewEventById = async (id: number, data: EventReview) => {
  try {
    return await api?.post(`/review/event/${id}`, data);
  } catch (err) {
    console.log("ERROR CATCHED ON BOOKMARK: POST: /event/bookmark/:slug");
  }
};


export const getEventDetailBySlug = async (slug: string , lang:string) => {
  try {
    const { data } = await api.get(`/event/detail/${slug}`);
    const videoPath = data.isJoined ? data?.videoPath : data?.trailerPath;
    const videoThumbnail = data.isJoined
      ? data?.thumbnailVideo
      : data?.thumbnailTrailer;

    const v = data?.Transcription?.filter((e: any) => e.type === 'VIDEO'); // video subtitles
    const c = data?.Transcription?.filter((e: any) => e.type === "CHAPTER"); // video chapter
    const t = lang ? 
               v?.find((e: any) => e.language === lang)?.transcriptionJson 
                // :  v[0]?.transcriptionJson 
               : []
    console.log(v , "vere")
    return {
      data: {
        data: data,
        video_subtitles: reformatSubtitles(v),
        video_chapters: data.isJoined ? reformatChapters(c) : [],
        video_transcription: t.filter((e: any) => e.text !== ""),
        video_thumbnail: defineImageURI(videoThumbnail),
      },
      status: 200,
    };
  } catch (error) {
    console.log("ERROR CATCHED ON SENDING: POST: /event detail/:slug");
    return { data: undefined, status: 404 };
  }
};

export const getVideoEventDetailByToken = async () => {
  try {
    const data = await api.get(`/event/detail/video/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInNsdWciOiJuaXNpLWRvbG9yLW9jY2FlY2F0LWRlc2VydW50LWlydXJlLXNpbnQtYXV0ZS1pbiIsImlhdCI6MTcwMzU5ODQxNSwiZXhwIjoxNzAzNjAwMjE1fQ.RIBN7EwRKC1kFh2zfnj0X115KiNXE_wGzIdNvBvbIRA`);
    console.log(data , "data here")
    return {
      data: {
        data: data,
      },
      status: 200,
    };
  } catch (error) {
    console.log("ERROR CATCHED ON SENDING: POST: /event detail video /:token");
    return { data: undefined, status: 404 };
  }
};

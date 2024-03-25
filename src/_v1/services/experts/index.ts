import api from "@/_v1/api/api";

export const getExpertsBySlug = async (slug: string) => {
  try {
    const { data } = await api.get(`/expert/${slug}`); //david-williams
    if (!data) return { status: 404, data: undefined };
    return { status: 200, data: data };
  } catch (error) {
    console.log("ERROR CATCHED ON FETCHING: GET: /expert/:slug");
  }
};

export const onUserFollowAnExpertsById = async (id: number) => {
  try {
    const { data } = await api.post(`/expert/follow/${id}`); //david-williams
    if (!data) return { status: 404, data: undefined };
    return { status: 200, data: data };
  } catch (error) {
    console.log("ERROR CATCHED ON FOLLOW EXPERT: GET: /expert/follow/:id");
  }
};


export const fetchModules = async (expertId: number, page: number) => {
  try {

    const { data } = await api.get(`/module?expertId=${expertId}&perPage=8${page ? `&page=${page}` : ''}`);
    return { status: 200, data: data }

  } catch (error) {
    return { status: 404, error: error }
  }
}


export const fetchNotes = async (expertId: number, page: number) => {
  try {
    const { data } = await api.get(`/note?expertId=${expertId}&perPage=6${page ? `&page=${page}` : ''}`);
    return { status: 200, data: data }

  } catch (error) {
    return { status: 404, error: error }

  }
}

// handle list of experts

export const fetchExperts = async (page: number, name: any | undefined, specialityId: any, search: any | undefined) => {
  try {
    const queryParams = [
      page && `page=${page}`,
      name !== undefined && name !== "" && `name=${name}`,
      specialityId && `specialityId=${specialityId}`,
      search !== undefined && `search=${search}`,
    ].filter(Boolean).join("&");

 
    const { data, status } = await api.get(`/expert${queryParams ? `?${queryParams}` : ""}`);

    if (!data) {
      return { status: 404, data: undefined };
    }

    return { status: 200, data: data };
  } catch (error) {
    return { status: 500, error: error };
  }
};


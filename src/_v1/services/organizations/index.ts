import api from "@/_v1/api/api";

export const getOrganizationsBySlug = async (slug: string) => {
  try {
    const { data } = await api.get(`/organization/${slug}`); //david-williams
    if (!data) return { status: 404, data: undefined };
    return { status: 200, data: data };
  } catch (error) {
    console.log("ERROR CATCHED ON FETCHING: GET: /organization/:slug");
  }
};

export const onUserFollowAnOrganizationById = async (id: number) => {
  try {
    const { data } = await api.post(`/organization/follow/${id}`); //david-williams
    if (!data) return { status: 404, data: undefined };
    return { status: 200, data: data };
  } catch (error) {
    console.log(
      "ERROR CATCHED ON FOLLOW INSTITUTION: GET:/organization/follow/:id"
    );
  }
};


// get all modules for one institution by id
export const fetchModules = async (organizationId: any, page: any) => {
  try {
    const { data } = await api.get(`/module?organizationId=${organizationId}&perPage=8${page ? `&page=${page}` : ''}`);
    if (!data) return { status: 404, data: undefined };
    return { status: 200, data: data };
  } catch (error) {
    return { status: 200, error: error }
  }
}

// get all notes for one institution by id
export const fetchNotes = async (organizationId: any, page: any) => {
  try {
    const { data } = await api.get(`/note?organizationId=${organizationId}&perPage=6${page ? `&page=${page}` : ''}`);
    if (!data) return { status: 404, data: undefined };
    return { status: 200, data: data };
  } catch (error) {
    return { status: 200, error: error }

  }
}


// get all experts for one institution by id
export const fetchExperts = async (organizationId: any, page: any) => {
  try {
    const { data } = await api.get(`/expert?organizationId=${organizationId}&perPage=10${page ? `&page=${page}` : ''}`);
    if (!data) return { status: 404, data: undefined };
    return { status: 200, data: data };
  } catch (error) {
    return { status: 200, error: error }

  }
}

export const fetchInstitution = async (page: any, name: any, specialityId: any, search: any) => {
  try {
    const queryParams = {
      page: page || "",
      name: name || "",
      specialityId: specialityId || "",
      search: search || "",
    };

    const queryString = Object.entries(queryParams)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const { data, status } = await api.get(`/organization?${queryString}&perPage=9`);

    if (!data) {
      return { status: 404, data: undefined };
    }

    return { status: 200, data: data };
  } catch (error) {
    return { status: 200, error: error };
  }
};


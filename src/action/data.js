import ActionTypes from "./ActionTypes";

export const getData = () => ({
  type: ActionTypes.GET_DATA,
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: "/data",
    },
  },
});

export const getIntermediateData = () => ({
  type: ActionTypes.GET_INTERMEDIATE_DATA,
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: "/data/intermediate",
    },
  },
});

export const getFiles = (staffId) => ({
  type: ActionTypes.GET_FILE,
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: `/staff/${staffId}/file`,
    },
  },
});

export const uploadFile = (staffId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return {
    type: ActionTypes.UPLOAD_FILE,
    payload: {
      client: "default",
      request: {
        method: "POST",
        url: `/staff/${staffId}/file`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      },
    },
  };
};

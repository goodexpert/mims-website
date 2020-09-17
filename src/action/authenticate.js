import ActionTypes from "./ActionTypes";

export const login = (email, password) => {
  const data = { email, password };

  return {
    type: ActionTypes.LOGIN,
    payload: {
      client: "default",
      request: {
        method: "POST",
        url: "/signin",
        headers: {
          "Content-Type": "application/json; charset: utf-8",
        },
        data: JSON.stringify(data),
      },
    },
  };
};

export const logout = () => ({
  type: ActionTypes.LOGOUT,
});

export const signup = (data) => ({
  type: ActionTypes.SIGNUP,
  payload: {
    client: "default",
    request: {
      method: "POST",
      url: "/signup",
      headers: {
        "Content-Type": "application/json; charset: utf-8",
      },
      data: JSON.stringify(data),
    },
  },
});

export const getUserMe = () => ({
  type: ActionTypes.GET_USER_ME,
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: "/user/me",
      headers: {
        "Content-Type": "application/json; charset: utf-8",
      },
    },
  },
});

export const updateProfile = (formData) => ({
  type: ActionTypes.UPDATE_PROFILE,
  payload: {
    client: "default",
    request: {
      method: "POST",
      url: "/user/me",
      headers: {
        "Content-Type": "application/json; charset: utf-8",
      },
      data: formData,
    },
  },
});

export const uploadPhoto = (staffId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return {
    type: ActionTypes.UPLOAD_PHOTO,
    payload: {
      client: "default",
      request: {
        method: "POST",
        url: `/staff/${staffId}/photo`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      },
    },
  };
};

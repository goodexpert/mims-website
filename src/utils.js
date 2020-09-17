/* eslint-disable no-else-return */
import moment from "moment";

/**
 * Utility function
 */
export const isAuthenticated = (authenticate) => {
  const { token } = authenticate;
  return token !== undefined && token !== null;
};

export const getLoginName = (authenticate) => {
  if (authenticate.token) {
    const { loginName } = authenticate.token;
    return loginName;
  }
  return "";
};

export const getNextLocation = (location) => {
  if (location.state) {
    const { pathname } = location.state;

    if (pathname !== "/" && pathname !== "/auth/login") {
      return pathname;
    }
  }
  return "/admin/dashboard";
};

// Returns true if a value is an array, false otherwise.
export const isArray = (value) => value && typeof value === "object" && value.constructor === Array;

// Returns true if a value is a numbery, false otherwise.
export const isNumber = (value) => typeof value === "number" && Number.isFinite(value);

// Returns true if a value is a string, false otherwise.
export const isString = (value) => typeof value === "string" || value instanceof String;

// Returns true if a value is not null and undefined, false otherwise.
export const isValidObject = (value) => value !== null && typeof value !== "undefined";

// Returns true if a value is a empty array, false otherwise.
export const isEmptyArray = (value) => !isArray(value) || value.length === 0;

// Returns true if a value is a empty string, false otherwise.
export const isEmptyString = (value) => (
  value === null
    || typeof value === "undefined"
    || (isString(value) && value.length === 0)
);

// Returns true if a value is an integer number, false otherwise.
export const isInteger = (value) => {
  const regExp = new RegExp("^-?[0-9]*$");
  return isValidObject(value) && regExp.test(value);
};

// Returns true if a value is a real number, false otherwise.
export const isRealNumber = (value) => {
  const regExp = new RegExp("^[+-]?([0-9]*[.])?[0-9]+$");
  return isValidObject(value) && regExp.test(value);
};

// Returns true if a value is an eamil address, false otherwise.
export const verifyEmail = (value) => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regExp.test(value)) {
    return true;
  }
  return false;
};

// Returns true if a value is greater than or equal to length, false otherwise.
export const verifyLength = (value, length) => {
  if (value.length >= length) {
    return true;
  }
  return false;
};

// Returns true if a value contains numbers, false otherwise.
export const verifyNumber = (value) => {
  const regExp = new RegExp("^[0-9]+$");
  return isValidObject(value) && regExp.test(value);
};

export const verifyRange = (text, minValue, maxValue) => {
  if (!isRealNumber(text)) return false;
  const value = parseFloat(text);
  return value >= minValue && value <= maxValue;
};

// When onChange is called
export const editorReducer = (state, action) => {
  const {
    type, value, stateName, targetValue,
  } = action;

  switch (type) {
    case "email":
      return verifyEmail(value)
        ? { ...state, [`${stateName}State`]: "has-success" }
        : { ...state, [`${stateName}State`]: "has-danger" };

    case "integer":
      return isInteger(value)
        ? { ...state, [`${stateName}State`]: "has-success" }
        : { ...state, [`${stateName}State`]: "has-danger" };

    case "latitude":
      return verifyRange(value, -90.0, 90.0)
        ? { ...state, [`${stateName}State`]: "has-success" }
        : { ...state, [`${stateName}State`]: "has-danger" };

    case "longitude":
      return verifyRange(value, -180.0, 180.0)
        ? { ...state, [`${stateName}State`]: "has-success" }
        : { ...state, [`${stateName}State`]: "has-danger" };

    case "length":
      return verifyLength(value, targetValue)
        ? { ...state, [`${stateName}State`]: "has-success" }
        : { ...state, [`${stateName}State`]: "has-danger" };

    case "maxLength":
      return !verifyLength(value, targetValue + 1)
        ? { ...state, [`${stateName}State`]: "has-success" }
        : { ...state, [`${stateName}State`]: "has-danger" };

    case "number":
      return verifyNumber(value)
        ? { ...state, [`${stateName}State`]: "has-success" }
        : { ...state, [`${stateName}State`]: "has-danger" };

    case "phoneNumber":
      return verifyNumber(value) && verifyLength(value, targetValue)
        ? { ...state, [`${stateName}State`]: "has-success" }
        : { ...state, [`${stateName}State`]: "has-danger" };

    case "real":
      return isRealNumber(value)
        ? { ...state, [`${stateName}State`]: "has-success" }
        : { ...state, [`${stateName}State`]: "has-danger" };

    default:
      return state;
  }
};

export const makeAction = (type, value, stateName, targetValue = null) => ({
  type, value, stateName, targetValue,
});

export const isSuccessful = (response) => isValidObject(response) && isValidObject(response.payload);

export const getNetworkError = (response) => new Error(
  isValidObject(response) && isValidObject(response.error)
    ? response.error.response.data.title
    : "Unknown server error",
);

export const latestTime = (time1, time2) => {
  if (isValidObject(time1) && isValidObject(time2)) {
    return moment(time1).isAfter(time2) ? time1 : time2;
  } else if (isValidObject(time1)) {
    return time1;
  } else if (isValidObject(time2)) {
    return time2;
  }
  return null;
};

export const mergeArray = (data, newData) => {
  if (!isArray(newData)) return data;
  return isArray(data) ? newData.concat(data) : newData;
};

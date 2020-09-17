import axios from "axios";
import moment from "moment";
import { multiClientMiddleware } from "redux-axios-middleware";
import Constants from "global";
import { isValidObject } from "utils";

const requestInterceptor = (
  { getState, dispatch, getSourceAction },
  request
) => {
  const { authenticate } = getState();
  const { token } = authenticate;
  let { headers } = request;

  if (isValidObject(token)) {
    const { _id } = token;

    if (isValidObject(_id)) {
      headers = { ...headers, accessToken: `${_id}` };
    }
  }
  return { ...request, headers };
};

const clients = {
  default: {
    client: axios.create({
      baseURL: `${Constants.SERVICE_BASE_URL}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "X-Custom-Header": `${Constants.SERVICE_X_CUSTOM_HEADER}`,
        "x-functions-key": `${Constants.SERVICE_X_FUNCTION_KEY}`,
        domain: `${Constants.SERVICE_DOMAIN_NAME}`,
        timeStamp: moment(new Date()).toISOString(),
      },
      responseType: "json",
    }),
    options: {
      interceptors: {
        request: [requestInterceptor],
      },
    },
  },
};

export const clientMiddleware = multiClientMiddleware(clients, null);

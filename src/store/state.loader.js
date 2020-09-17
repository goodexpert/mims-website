import Constants from "global";
import { initialState as initialAuthenticateState } from "./authenticate.reducer";
import { initialState as initialDataState } from "./data.reducer";
import { isValidObject } from "utils";

const initialState = {
  authenticate: initialAuthenticateState,
  data: initialDataState,
};

export const loadState = () => {
  try {
    const state = localStorage.getItem(Constants.SERVICE_STORE_KEY);
    if (isValidObject(state)) {
      return JSON.parse(state);
    }
  } catch (error) {
    console.error("Error", error);
  }
  return initialState;
};

export const saveState = (state) => {
  try {
    const json = JSON.stringify(state);
    localStorage.setItem(Constants.SERVICE_STORE_KEY, json);
  } catch (error) {
    console.error("Error", error);
  }
};

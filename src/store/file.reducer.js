import { ActionTypes } from "action";

/**
 * The initial state
 */
export const initialState = {
  isLoading: false,
  error: null,
  data: [],
  page: 1,
  size: 10,
  totalCount: 0,
  timeStamp: null,
};

/**
 * A reducer function that returns the next state tree,
 * given the current state tree and the action to handle.
 *
 * @param {any} state the current state
 * @param {Object} action A plain object representing “what changed”.
 * @return {any} the next state
 */
export const reducer = (state = initialState, action) => {
  const { error, payload } = action;

  switch (action.type) {
    case ActionTypes.GET_FILE:
      return { ...state, isLoading: true, error: null };

    case ActionTypes.GET_FILE_SUCCESS:
      return {
        ...state, isLoading: false, error: null,
      };

    case ActionTypes.GET_FILE_FAIL:
    case ActionTypes.UPLOAD_FILE_FAIL:
      return { ...state, isLoading: false, error };

    case ActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

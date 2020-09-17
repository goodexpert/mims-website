import { ActionTypes } from "action";

/**
 * The initial state
 */
export const initialState = {
  isLoading: false,
  error: null,
  token: null,
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
    case ActionTypes.LOGIN:
      return { ...state, isLoading: true, error: null };

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state, isLoading: false, error: null, token: payload.data,
      };

    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state, isLoading: false, error: null,
      };

    case ActionTypes.LOGIN_FAIL:
    case ActionTypes.SIGNUP_FAIL:
    case ActionTypes.GET_USER_ME_FAIL:
      return { ...state, isLoading: false, error };

    case ActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

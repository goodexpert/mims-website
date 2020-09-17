import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import { reducer as authenticateReducer } from "./authenticate.reducer";
import { clientMiddleware } from "./network";
import { reducer as dataReducer } from "./data.reducer";
import {
  loadState, saveState,
} from "./state.loader";

const createAppStore = () => {
  const logger = createLogger({
    collapsed: true,
  });

  const rootReducers = combineReducers({
    authenticate: authenticateReducer,
    data: dataReducer,
  });

  const store = createStore(
    rootReducers,
    loadState(),
    applyMiddleware(clientMiddleware, logger, thunk),
  );

  store.subscribe(() => {
    saveState(store.getState());
  });
  return store;
};

export default createAppStore;

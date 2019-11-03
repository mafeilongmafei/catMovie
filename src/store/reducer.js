import { combineReducers } from "redux";

import {
  SETPOSITION,
  SETINPUTVALUE,
  REMOVEINPUTVALUE
} from "./actions/actionTypes";
const defaultState = {
  posi: {},
  defaultValue : "",
};

const home = (state = defaultState, action) => {
  switch (action.type) {
    case SETPOSITION:
      return Home.setP(state, action);
      break;
    case SETINPUTVALUE:
      return Home.setVa(state, action);
    case REMOVEINPUTVALUE:
      return Home.remVal(state, action);

    default:
      return state;
  }
};

export default combineReducers({
  home
});

class Home {
  static setP(state, action) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.posi = action.data;
    return newState;
  }
  static setVa(state, action) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.defaultValue = action.data;
    return newState;
  }
  static remVal(state, action) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.defaultValue = "";
    return newState;
  }
}

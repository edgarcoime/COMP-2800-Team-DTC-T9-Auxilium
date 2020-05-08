import * as actions from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  id: null
};

export default function errorReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_ERRORS:
      return {
        msg: action.payload.msg,
        stats: action.payload.status,
        id: action.payload.id
      };
    case actions.CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state
  }
}
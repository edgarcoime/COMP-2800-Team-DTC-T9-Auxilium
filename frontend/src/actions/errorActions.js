import * as actions from "./types";

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: actions.GET_ERRORS,
    payload: { msg, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: actions.CLEAR_ERRORS,
  };
};

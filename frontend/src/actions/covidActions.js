import axios from "axios";
import * as actions from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const createCovidPost = (newPost) => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      "https://auxilium-dtc-t9-backend-api.herokuapp.com/api/covid",
      newPost,
      tokenConfig(getState)
    );
    const payload = response.data;
    console.log(payload)

    dispatch({
      type: actions.CREATE_C_POST,
      payload,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const deleteCovidPost = (deleteReq) => async (dispatch, getState) => {
  try {
    const postId = deleteReq.postId
    const response = await axios.delete(
      `https://auxilium-dtc-t9-backend-api.herokuapp.com/api/posts/`, 
      deleteReq,
      tokenConfig(getState)
    );
    console.log(response)

    dispatch({
      type: actions.DELETE_POST,
      payload: deleteReq.postId,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const setItemsLoading = () => {
  return {
    type: actions.POSTS_LOADING,
  };
};

import axios from "axios";
import * as actions from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch(setItemsLoading());
    const response = await axios.get("/api/posts/getall");
    const payload = response.data;

    dispatch({
      type: actions.GET_ALL_POSTS,
      payload,
    });
    
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const createPost = (newPost) => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      "/api/posts",
      newPost,
      tokenConfig(getState)
    );
    const payload = response.data;
    console.log(payload)

    dispatch({
      type: actions.CREATE_POST,
      payload,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const deletePost = (deleteReq) => async (dispatch, getState) => {
  try {
    const postId = deleteReq.postId
    const response = await axios.delete(
      `/api/posts/`, 
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

export const filterPost = (posts, word) => async (dispatch) => {
  try {
    return dispatch({
      type:actions.FILTER_POSTS,
      payload:{
        word:word,
        results:word === ''? posts:posts.filter(a => {return a.title.toLowerCase().indexOf(word.toLowerCase()) !== -1})
      }
    })
  } catch (error) {
    // dispatch(returnErrors(error.response.data, error.response.status));
    console.log(error)
  }
};

export const setItemsLoading = () => {
  return {
    type: actions.POSTS_LOADING,
  };
};

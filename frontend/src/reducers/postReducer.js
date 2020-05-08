import * as actions from "../actions/types";

const initialState = {
  posts: []
}

export default function postReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload
      }
      case actions.DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post.id !== action.payload)
        }
      default:
        return state
  }
};
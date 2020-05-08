import * as actions from "../actions/types";

const initialState = {
  covidPosts: []
}

export default function covidPostsReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_ALL_C_POSTS:
      return {
        ...state,
        covidPosts: action.payload
      }
      case actions.DELETE_C_POST:
        return {
          ...state,
          covidPosts: state.covidPosts.filter(covidPost => covidPost.id !== action.payload)
        }
      default:
        return state
  }
};
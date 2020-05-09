import { combineReducers } from "redux";
import postReducer from "./postReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import covidPostsReducer from "./covidReducer";

export default combineReducers({
  post: postReducer,
  error: errorReducer,
  auth: authReducer,
  covidPosts: covidPostsReducer,
});

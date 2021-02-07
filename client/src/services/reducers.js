import { combineReducers } from "redux"

import authReducer from "./auth/reducer"
import errorReducer from "./errors/reducer"
import postReducer from "./posts/reducer"

export default combineReducers({
  auth: authReducer,
  post: postReducer,
  errors: errorReducer,
})

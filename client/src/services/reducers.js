import { combineReducers } from "redux"

import authReducer from "./auth/reducer"
import errorReducer from "./errors/reducer"
import postReducer from "./posts/reducer"
import modalReducer from './modal/reducer'

export default combineReducers({
  auth: authReducer,
  post: postReducer,
  errors: errorReducer,
  modal: modalReducer,
})

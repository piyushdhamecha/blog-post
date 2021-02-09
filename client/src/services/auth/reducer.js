import _ from "lodash"
import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from "./constants"

const initialState = {
  isAuthenticated: false,
  user: {},
  userLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload,
      }
    case TOGGLE_USER_LOADING:
      return {
        ...state,
        userLoading: !state.userLoading,
      }
    default:
      return state
  }
}

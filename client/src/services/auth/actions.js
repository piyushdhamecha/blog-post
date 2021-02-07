import axios from "axios"
import jwtDecode from "jwt-decode"
import { setAuthToken } from "../../utils/auth"

import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from "./constants"
import { resetPost } from "../posts/actions"
import { setErrors } from "../errors/actions"

export const toggleUserLoading = () => ({
  type: TOGGLE_USER_LOADING,
})

export const setCurrentUser = (userData) => ({
  type: SET_CURRENT_USER,
  payload: userData,
})

export const registerUser = (userData, history) => (dispatch) => {
  dispatch(toggleUserLoading())

  axios
    .post("/api/users/signup", userData)
    .then(() => {
      dispatch(toggleUserLoading())

      localStorage.setItem(
        "loginMessage",
        "Successfully registered. Login to continue"
      )

      history.push("/login")
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(toggleUserLoading())
    })
}

export const loginUser = (userData) => (dispatch) => {
  dispatch(toggleUserLoading())

  axios
    .post("/api/users/login", userData)
    .then((res) => {
      dispatch(resetPost())

      const { token } = res.data
      localStorage.setItem("jwtToken", token)
      setAuthToken(token)

      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
      dispatch(toggleUserLoading())
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(toggleUserLoading())
    })
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken")
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}

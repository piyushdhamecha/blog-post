import { SET_ERRORS } from "./constants"

export const setErrors = (error) => ({
  type: SET_ERRORS,
  payload: error,
})

export const clearErrors = () => ({
  type: SET_ERRORS,
  payload: {},
})

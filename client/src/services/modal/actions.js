import { SHOW_MODAL, HIDE_MODAL } from "./constants"

export const showModal = (options) => ({
  type: SHOW_MODAL,
  payload: options,
})

export const hideModal = () => ({
  type: HIDE_MODAL,
})

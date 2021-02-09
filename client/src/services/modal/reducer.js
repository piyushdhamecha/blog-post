import { SHOW_MODAL, HIDE_MODAL } from "./constants"

const initialState = {
  show: false,
  modalType: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        show: true,
        ...action.payload
      }
      case HIDE_MODAL:
        return initialState
    default:
      return state
  }
}

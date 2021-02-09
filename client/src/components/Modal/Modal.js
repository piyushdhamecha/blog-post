import React from 'react'
import ReactBootStrapModal from 'react-bootstrap/Modal'
import { connect } from 'react-redux'
import { hideModal as hideModalAction } from '../../services/modal/actions'

import { modalComponents } from './constants'

const Modal = ({ show, modalType, hideModal }) => {
  const BodyComponent = modalComponents[modalType] || null

  return (
    <ReactBootStrapModal show={show} onHide={hideModal} aria-labelledby="contained-modal-title-vcenter" centered>
      {BodyComponent ? <BodyComponent /> : null}
    </ReactBootStrapModal>
  )
}

const mapStateToProps = (state) => ({
  show: state.modal.show,
  modalType: state.modal.modalType,
})

const mapDispatchToProps = {
  hideModal: hideModalAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)

import React from 'react'
import ReactBootstrapSpinner from 'react-bootstrap/Spinner'
import spinnerCss from './spinner.module.css'

const Spinner = () => (
  <div className={spinnerCss.container}>
    <ReactBootstrapSpinner animation="border" />
  </div>
)

export default Spinner

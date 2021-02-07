import React from "react"
import { connect } from "react-redux"

import NavigationBar from "../../components/Layout/NavigationBar"
import { logoutUser as logoutUserAction } from "../../services/auth/actions"

const Navbar = ({ auth, logoutUser }) => {
  const handleClick = (e) => {
    e.preventDefault()
    logoutUser()
  }
  return <NavigationBar auth={auth.isAuthenticated} onClick={handleClick} />
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser: logoutUserAction })(
  Navbar
)

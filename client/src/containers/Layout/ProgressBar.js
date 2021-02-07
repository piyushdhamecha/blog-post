import React from "react"
import { connect } from "react-redux"

import Progress from "../../components/Layout/Progress"

const ProgressBar = ({ loading }) => (loading ? <Progress /> : <div />)

const mapStateToProps = (state) => ({
  loading:
    state.auth.userLoading || state.post.postLoading || state.post.postsLoading,
})

export default connect(mapStateToProps)(ProgressBar)

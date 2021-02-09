import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import store from './store'
import { setAuthToken } from './utils/auth'
import { setCurrentUser, logoutUser } from './services/auth/actions'

import LoginPage from './containers/Auth/LoginPage'
import SignUpPage from './containers/Auth/SignUpPage'

import ProgressBar from './containers/Layout/ProgressBar'
import Navbar from './containers/Layout/Navbar'
import Landing from './components/Layout/Landing'
import BlogPage from './containers/BlogPage'
import PrivateRoute from './utils/PrivateRoute'

// import ViewPostPage from "./containers/Posts/ViewPostPage"
import CreatePostPage from './containers/Posts/CreatePostPage'
import UpdatePostPage from './containers/Posts/UpdatePostPage'

import Modal from './components/Modal/Modal'

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken
  setAuthToken(token)

  const decoded = jwt_decode(token)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())

    window.location.href = './loginPage'
  }
}

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Modal />
      <ProgressBar />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute exact path="/blog" component={BlogPage} />
        <PrivateRoute exact path="/blog/post/create" component={CreatePostPage} />
        <PrivateRoute exact path="/blog/post/update/:id" component={UpdatePostPage} />
        <Route path="/blog/:author" component={BlogPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default App

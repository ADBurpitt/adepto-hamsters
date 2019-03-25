import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import PrivateRoute from 'components/auth/PrivateRoute'
import AuthRoute from 'components/auth/AuthRoute'

import Home from 'components/pages/Home'

import Signin from 'components/auth/Signin'
import Signup from 'components/auth/Signup'

import Timeline from 'components/pages/Timeline'
import Profile from 'components/pages/Profile'
import CreatePost from 'components/pages/CreatePost'

const Routes = () =>
  <Switch>
    <AuthRoute exact path='/' component={Home} />

    <AuthRoute path='/signin' component={Signin} />
    <AuthRoute path='/signup' component={Signup} />

    <PrivateRoute path='/timeline' component={Timeline} />
    <PrivateRoute path='/profile' component={Profile} />
    <PrivateRoute path='/posts/new' component={CreatePost} />
    
    <Redirect from='*' to ='/' />
  </Switch>

export default Routes
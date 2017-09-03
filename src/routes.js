import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeView from './views/HomeView'
import BooksView from './views/BooksView'
import CreateBookView from './views/CreateBookView'
import LoginPage from './users/LoginPage'
import RegisterPage from './users/RegisterPage'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomeView} />
    <Route path='/home' component={HomeView} />
    <Route path='/login' component={LoginPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/books' component={BooksView} />
    <Route path='/create-book' component={CreateBookView} />
    {/* <Route path='' component={RegisterPage} /> */}
  </Switch>
)

export default Routes

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './components/home/HomePage'
import BooksView from './components/books//BooksView'
import EditBookView from './components/books//EditBookView'
import CreateBookView from './components/books/CreateBookView'
import DeleteBookView from './components/books/DeleteBookView'
import LoginPage from './components/users/LoginPage'
import RegisterPage from './components/users/RegisterPage'
import Logout from './components/users/Logout'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route path='/home' component={HomePage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/books' component={BooksView} />
    <Route path='/edit-book/:id' component={EditBookView} />
    <Route path='/delete-book/:id' component={DeleteBookView} />
    <Route path='/create-book' component={CreateBookView} />
    <Route path='/logout' component={Logout} />
  </Switch>
)

export default Routes

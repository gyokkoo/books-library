import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './NavigationBar.css'

export default class NavigationBar extends Component {
  render () {
    if (window.localStorage.getItem('authToken') !== null) {
      return (
        <div className='navigation-bar'>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
      )
    } else {
      return (
        <div className='navigation-bar'>
          <Link to='/'>Home</Link>
          <Link to='/books'>Books</Link>
          <Link to='/create-book'>Create Book</Link>
          <Link to='/logout'>Logout</Link>
          <span className='loggedInUser'>Welcome, {this.props.username}!</span>
        </div>
      )
    }
  }
}

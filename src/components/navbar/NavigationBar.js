import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './NavigationBar.css'

class NavigationBar extends Component {
  render () {
    let navbarLinks
    if (window.sessionStorage.getItem('authToken') === null) {
      navbarLinks =
        <span>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </span>
    } else {
      navbarLinks =
        <span>
          <Link to='/'>Home</Link>
          <Link to='/books'>Books</Link>
          <Link to='/create-book'>Create Book</Link>
          <Link to='/logout'>Logout</Link>
          <span className='loggedInUser'>Welcome, {window.sessionStorage.getItem('username')}!</span>
        </span>
    }

    return (
      <nav>
        <div className='navigation-bar navbar-fixed-top'>
          <Link to='/' className='navbar-header'>
            Books Library <span className='glyphicon glyphicon-book' />
          </Link>
          {navbarLinks}
        </div>
      </nav>
    )
  }
}

export default NavigationBar

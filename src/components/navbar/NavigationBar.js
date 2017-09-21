import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './NavigationBar.css'

class NavigationBar extends Component {
  render () {
    let navbarLinks
    if (window.sessionStorage.getItem('authToken') === null) {
      navbarLinks =
        <span>
          <Link to='/books-library/home'>Home</Link>
          <Link to='/books-library/login'>Login</Link>
          <Link to='/books-library/register'>Register</Link>
        </span>
    } else {
      navbarLinks =
        <span>
          <Link to='/books-library/home'>Home</Link>
          <Link to='/books-library/books'>Books</Link>
          <Link to='/books-library/create-book'>Create Book</Link>
          <Link to='/books-library/logout'>Logout</Link>
          <span className='loggedInUser'>
            <Link to='/books-library/profile'>
              <i className='glyphicon glyphicon-user' />
              &nbsp;
              {window.sessionStorage.getItem('username')}
            </Link>
          </span>
        </span>
    }

    return (
      <nav>
        <div className='navigation-bar navbar-fixed-top'>
          <Link to='/books-library/' className='navbar-header'>
            Books Library <span className='glyphicon glyphicon-book' />
          </Link>
          {navbarLinks}
        </div>
      </nav>
    )
  }
}

export default NavigationBar

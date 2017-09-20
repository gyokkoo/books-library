import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './HomePage.css'

class HomePage extends Component {
  render () {
    let userGreeting
    let username = window.sessionStorage.getItem('username')
    if (username) {
      userGreeting =
        <div>
          <h2>Hello, {username}!</h2>
          <hr />
        </div>
    } else {
      userGreeting =
        <div>
          <Link to='books-library/login'>
            <button>Login</button>
          </Link>
          &nbsp;
          <Link to='books-library/register'>
            <button>Sign up</button>
          </Link>
        </div>
    }
    return (
      <div className='home-view text-center'>
        <h2>Welcome to the world of books</h2>
        {userGreeting}
      </div>
    )
  }
}

export default HomePage

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
          <Link to='/books-library/books'>
            <button>All books</button>
          </Link>
          <br />
          <Link to='/books-library/create-book'>
            <button>Create book</button>
          </Link>
          <hr />
        </div>
    } else {
      userGreeting =
        <div>
          <h3>Please login to access the books in the project</h3>
          <Link to='/books-library/login'>
            <button>Login</button>
          </Link>
          &nbsp;
          <Link to='/books-library/register'>
            <button>Sign up</button>
          </Link>
        </div>
    }
    return (
      <div className='home-view text-center'>
        <h1>Welcome to the world of books</h1>
        {userGreeting}
      </div>
    )
  }
}

export default HomePage

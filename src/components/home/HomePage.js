import React, { Component } from 'react'
import './HomePage.css'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    let userGreeting
    let username = window.sessionStorage.getItem('username')
    if (username) {
      userGreeting =
        <div>
          <h2>Hello, {username}!</h2>
          {/* <h3>Add your favourite books and enjoy browsing</h3> */}
        </div>
    } else {
      userGreeting =
        <div>
          <h2>Hello, dear friend!</h2>
          <h3>Please sign in here</h3>
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

import React, {Component} from 'react'

class ProfilePage extends Component {
  constructor (props) {
    super(props)

    const username = window.sessionStorage.getItem('username')
    this.state = {
      username
    }
  }

  render () {
    return (
      <div>
        <h2>{this.state.username}</h2>
        <p className='text-center'>
          Display books added by this user...
          Coming soon!</p>
      </div>
    )
  }
}

export default ProfilePage

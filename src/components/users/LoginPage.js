import React, {Component} from 'react'
import KinveyRequester from '../../utilities/KinveyRequester'

import LoginForm from './LoginForm'

class LoginPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        username: '',
        password: ''
      },
      error: ''
    }
  }

  handleUserChange (event) {
    const target = event.target
    const field = target.name
    const value = target.value

    const user = this.state.user
    user[field] = value

    this.setState({
      user
    })
  }

  loginUser (event) {
    event.preventDefault()
    const user = this.state.user

    // TODO: validate user input

    KinveyRequester.loginUser(user.username, user.password)
      .then(loginSuccess.bind(this))

    function loginSuccess (userInfo) {
      window.sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
      window.sessionStorage.setItem('userId', userInfo._id)
      window.sessionStorage.setItem('username', userInfo.username)

      this.setState({
        username: userInfo.username,
        userId: userInfo._id
      })

      this.props.history.push('/home')
      this.showInfo('You have successfully logged in')
    }
  }

  render () {
    return (
      <div>
        <h1>Login User</h1>
        <LoginForm
          user={this.state.user}
          onChange={this.handleUserChange.bind(this)}
          onSave={this.loginUser.bind(this)}
          error={this.state.error} />
      </div>
    )
  }
}

export default LoginPage

import React, { Component } from 'react'
import RegisterForm from './RegisterForm'

import KinveyRequester from '../KinveyRequester'

class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        userId: '',
        username: '',
        password: '',
        confirmPassword: ''
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

  registerUser (event) {
    event.preventDefault()
    const user = this.state.user

    if (!this.validateUser(this.state.user)) {
      return
    }

    KinveyRequester.registerUser(user.username, user.password)
      .then(registerSuccess.bind(this))

    function registerSuccess (userInfo) {
      window.sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
      window.sessionStorage.setItem('userId', userInfo._id)
      window.sessionStorage.setItem('username', userInfo.username)

      // This will update the entire app UI (e.g. the navigation bar)
      this.setState({
        user: {
          username: userInfo.username,
          userId: userInfo._id
        }
      })

      this.props.history.push('/home')
      this.showInfo('You have successfully registered')
    }
  }

  validateUser (user) {
    if (user.password !== user.confirmPassword) {
      this.setState({ error: 'Passwords do not match! ' })
      return false
    }

    // TODO: validate

    return true
  }

  render () {
    return (
      <div>
        <h1>Register User</h1>
        <RegisterForm
          user={this.state.user}
          onChange={this.handleUserChange.bind(this)}
          onSave={this.registerUser.bind(this)}
          error={this.state.error}
        />
      </div>
    )
  }
}

export default RegisterPage

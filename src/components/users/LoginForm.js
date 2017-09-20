import React from 'react'
import { Link } from 'react-router-dom'

import './UserForm.css'

const LoginForm = (props) => (
  <div className='row'>
    <div className='col-md-offset-4 col-md-3'>
      <div>{props.error}</div>
      <div className='user-form'>
        <h4>Login here</h4>
        <input
          className='form-control input-sm chat-input'
          name='username'
          type='text'
          placeholder='username'
          onChange={props.onChange} />
        <br />
        <input
          className='form-control input-sm chat-input'
          type='password'
          name='password'
          placeholder='password'
          onChange={props.onChange} />
        <br />
        <div className='wrapper'>
          <span className='group-btn'>
            <input
              className='btn btn-primary btn-md'
              value='Login'
              type='submit'
              onClick={props.onSave} />
          </span>
          <br />
          <br />
          <p>
            <span>New user? </span>
            <Link to='/register'>Create new account</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default LoginForm

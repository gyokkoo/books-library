import React from 'react'
import { Link } from 'react-router-dom'

import './UserForm.css'

const RegisterForm = (props) => (
  <div className='row'>
    <div className='col-md-offset-4 col-md-3'>
      <div>{props.error}</div>
      <form className='user-form'>
        <h4>Register here</h4>
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
        <input
          className='form-control input-sm chat-input'
          type='password'
          name='confirmPassword'
          placeholder='confirm password'
          onChange={props.onChange} />
        <br />
        <div className='wrapper'>
          <span className='group-btn'>
            <input
              className='btn btn-primary btn-md'
              value='Register'
              type='submit'
              onClick={props.onSave} />
          </span>
          <br />
          <br />
          <p>
            <span>Already have an account? </span>
            <Link to='/books-library/login'>Login here</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
)

export default RegisterForm

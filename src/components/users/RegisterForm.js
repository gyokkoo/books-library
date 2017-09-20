import React from 'react'
import { Link } from 'react-router-dom'

import './UserForm.css'

const RegisterForm = (props) => (
  <div className='row'>
    <div className='col-md-offset-4 col-md-3'>
      <div>{props.error}</div>
      <div className='user-form'>
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
            <Link to='/login'>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  // <form>
  //   <div>{props.error}</div>
  //   <label htmlFor='username'>Username</label>
  //   <input
  //     type='username'
  //     name='username'
  //     placeholder='Username'
  //     value={props.user.username}
  //     onChange={props.onChange} />
  //   <br />
  //   <label htmlFor='password'>Password</label>
  //   <input
  //     type='password'
  //     name='password'
  //     placeholder='Password'
  //     value={props.user.password}
  //     onChange={props.onChange} />
  //   <br />
  //   <label htmlFor='confirmPassword'>Confirm Password</label>
  //   <input
  //     type='password'
  //     name='confirmPassword'
  //     placeholder='Confirm Password'
  //     value={props.user.confirmPassword}
  //     onChange={props.onChange} />
  //   <br />
  //   <input type='submit' onClick={props.onSave} />
  // </form>
)

export default RegisterForm

import React from 'react'

export default function HomeView (props) {
  let username = window.sessionStorage.getItem('username')
  return (
    <div className='home-view'>
      <h1>Welcome to Home</h1>
      <p> Welcome to my book library</p>
      {
        username ? <p>Welcome, {username}.</p> : <p>No user logged in.</p>
      }
    </div>
  )
}

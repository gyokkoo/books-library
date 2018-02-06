import React, { Component } from 'react'

class AuthorsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      authorId: '',
      books: []
    }
  }

  render () {
    return (
      <div className='text-center'>
        Authors coming soon.
      </div>
    )
  }
}

export default AuthorsPage

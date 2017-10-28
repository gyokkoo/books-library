import React, {Component} from 'react'
import KinveyRequester from '../../../utilities/KinveyRequester'
import Helpers from '../../../utilities/Helpers'

class ProfilePage extends Component {
  constructor (props) {
    super(props)

    const username = window.sessionStorage.getItem('username')
    this.state = {
      books: [],
      username
    }
  }

  componentDidMount () {
    KinveyRequester.findAllBooks().then(loadBooksSuccess.bind(this))
    function loadBooksSuccess (books) {
      this.setState({
        books: books.filter(book => book.addedByUser === this.state.username)
      })
      Helpers.showInfo('Books loaded')
    }
  }

  render () {
    let books
    if (this.state.books.length !== 0) {
      books = this.state.books.map(book =>
        <div>
          <img src={book.imageUrl} width='150px' />
          <h3>{book.title}</h3>
          <h5>{book.author}</h5>
          <h6>{book.description}</h6>
          <hr />
        </div>)
    } else {
      books = <div>You don't have added books.</div>
    }

    return (
      <div className='text-center'>
        <h2>{this.state.username}</h2>
        <hr />
        {books}
      </div>
    )
  }
}

export default ProfilePage

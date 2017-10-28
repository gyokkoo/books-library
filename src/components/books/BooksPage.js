import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Helpers from '../../utilities/Helpers'
import KinveyRequester from '../../utilities/KinveyRequester'
import EditBookPage from './EditBookPage'
import './BooksPage.css'

export default class BooksView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userId: '',
      books: []
    }
  }

  componentDidMount () {
    KinveyRequester.findAllBooks().then(loadBooksSuccess.bind(this))
    function loadBooksSuccess (books) {
      console.log(books)
      this.setState({
        books: books,
        userId: window.sessionStorage.getItem('userId')
      })
      Helpers.showInfo('Books loaded')
    }
  }

  prepareBookForEdit (bookId) {
    KinveyRequester.findBookById(bookId)
      .then(loadBookForEditSuccess.bind(this))

    function loadBookForEditSuccess (bookInfo) {
      this.showView(
        <EditBookPage
          onsubmit={this.editBook.bind(this)}
          bookId={bookInfo._id}
          title={bookInfo.title}
          author={bookInfo.author}
          description={bookInfo.description}
        />
      )
    }
  }

  render () {
    let bookRows = this.state.books.map(book =>
      <tr key={book._id}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.description}</td>
        <td><Link to={`/books-library/book-details/${book._id}`}>More info</Link></td>
      </tr>
    )

    return (
      <div className='books-view text-center'>
        <h1>All books in the database</h1>
        <table className='books-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {bookRows}
          </tbody>
        </table>
      </div>
    )
  }
}

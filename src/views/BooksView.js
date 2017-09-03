import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Helpers from '../utilities/Helpers'
import KinveyRequester from '../KinveyRequester'
import EditBookView from './EditBookView'

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
    function loadBooksSuccess(books) {
      this.setState({
        books: books,
        userId: window.sessionStorage.getItem('userId')
      })
      Helpers.showInfo('Books loaded')
      // this.showView(<BooksView
      //   books={books}
      //   userId={this.state.userId}
      //   editBookClicked={this.prepareBookForEdit.bind(this)}
    }
  }

  prepareBookForEdit (bookId) {
    KinveyRequester.findBookById(bookId)
      .then(loadBookForEditSuccess.bind(this))

    function loadBookForEditSuccess (bookInfo) {
      this.showView(
        <EditBookView
          onsubmit={this.editBook.bind(this)}
          bookId={bookInfo._id}
          title={bookInfo.title}
          author={bookInfo.author}
          description={bookInfo.description}
        />
      )
    }
  }

  editBook (bookId, title, author, description) {
    KinveyRequester.editBook(bookId, title, author, description)
      .then(editBookSuccess.bind(this))

    function editBookSuccess () {
      this.props.history.push('/books')
      this.showInfo('Book created.')
    }
  }

  deleteBook (bookId) {
    KinveyRequester.deleteBook(bookId)
      .then(deleteBookSuccess.bind(this))

    function deleteBookSuccess () {
      this.props.history.push('/books')
      this.showInfo('Book deleted.')
    }
  }

  render () {
    let bookRows = this.state.books.map(book =>
      <tr key={book._id}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.description}</td>
        {this.getActions(book, this.props.userId)}
      </tr>
    )

    return (
      <div className='books-view'>
        <h1>Books</h1>
        <table className='books-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookRows}
          </tbody>
        </table>
      </div>
    )
  }

  getActions (book) {
    if (book._acl.creator === window.sessionStorage.getItem('userId')) {
      return (
        <td>
          <Link to={`/edit-book/${book._id}`}>
            <input type='button' value='Edit'
              onClick={this.prepareBookForEdit.bind(this, book._id)} />
          </Link>
          &nbsp;
          <Link to={`/delete-book/${book._id}`}>
            <input type='button' value='Delete'
              onClick={this.deleteBook.bind(this, book._id)} />
          </Link>
        </td>
      )
    } else {
      return <td />
    }
  }
}

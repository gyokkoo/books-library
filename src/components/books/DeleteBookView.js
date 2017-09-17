import React, { Component } from 'react'
import KinveyRequester from '../../utilities/KinveyRequester'
import Helpers from '../../utilities/Helpers'

export default class DeleteBookView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: {
        bookId: '',
        title: '',
        author: '',
        description: ''
      }
    }

    this.deleteBook = this.deleteBook.bind(this)
  }

  componentWillMount () {
    let id = this.props.match.params.id
    KinveyRequester.findBookById(id).then(findBookByIdSuccess.bind(this))
    function findBookByIdSuccess (book) {
      this.setState({
        book: {
          bookId: id,
          title: book.title,
          author: book.author,
          description: book.description
        }
      })
    }
  }

  componentWillUnmount () {
    Helpers.showInfo(`The book ${this.state.title} was deleted`)    
  }

  deleteBook (event) {
    event.preventDefault()
    KinveyRequester.deleteBook(
      this.state.book.bookId
    )
    .then(deleteBookSuccess.bind(this))

    function deleteBookSuccess () {
      this.props.history.push('/books')
    }
  }

  render () {
    let book = this.state.book
    if (book) {
      return (
        <form className='delete-book-form'>
          <h1>Confirm Delete Book</h1>
          <label>
            <div>Title:</div>
            <input type='text' name='title' size='35' disabled
              value={this.state.book.title} />
          </label>
          <br />
          <label>
            <div>Author:</div>
            <input type='text' name='author' disabled
              value={this.state.book.author} />
          </label>
          <br />
          <label>
            <div>Description:</div>
            <textarea name='description' rows='10' disabled
              value={this.state.book.description} />
          </label>
          <div>
            <input type='submit' value='Delete' onClick={this.deleteBook} />
          </div>
        </form>
      )
    } else {
      return null
    }
  }
}

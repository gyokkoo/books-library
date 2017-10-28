import React, { Component } from 'react'
import KinveyRequester from '../../utilities/KinveyRequester'
import Helpers from '../../utilities/Helpers'

import './Form.css'

class DeleteBookPage extends Component {
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
      this.props.history.push('/books-library/books')
    }
  }

  render () {
    let book = this.state.book
    if (book) {
      return (
        <div className='row'>
          <div className='col-md-offset-4 col-md-3'>
            <form className='book-form'>
              <h2>Confirm Delete Book</h2>
              <label>
                <div>Title:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='text' name='title' size='35' disabled
                  value={this.state.book.title} />
              </label>
              <br />
              <label>
                <div>Author:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='text' name='author' disabled size='35'
                  value={this.state.book.author} />
              </label>
              <br />
              <label>
                <div>Description:</div>
                <textarea
                  className='form-control input-sm chat-input'
                  name='description' rows='10' disabled cols='50'
                  value={this.state.book.description} />
              </label>
              <div className='group-btn text-center'>
                <input
                  className='btn btn-danger btn-md'
                  value='Delete Book'
                  type='submit'
                  onClick={this.deleteBook} />
              </div>
            </form>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default DeleteBookPage

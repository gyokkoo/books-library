import React, { Component } from 'react'
import KinveyRequester from '../../utilities/KinveyRequester'
import Helpers from '../../utilities/Helpers'

import './Form.css'

class EditBookPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: {
        bookId: '',
        title: '',
        author: '',
        description: '',
        imageUrl: '',
        addedByUser: ''
      }
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.editBook = this.editBook.bind(this)
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
          description: book.description,
          imageUrl: book.imageUrl,
          addedByUser: book.addedByUser
        }
      })
    }
  }

  handleUserChange (event) {
    const target = event.target
    const field = target.name
    const value = target.value

    const book = this.state.book
    book[field] = value

    this.setState({
      book
    })
  }

  editBook (event) {
    event.preventDefault()
    const book = this.state.book
    const username = window.sessionStorage.getItem('username')
    KinveyRequester.editBook(
      book.bookId,
      book.title,
      book.author,
      book.description,
      book.imageUrl,
      username
    )
    .then(editBookSuccess.bind(this))
    function editBookSuccess () {
      Helpers.showInfo(`The book ${this.state.title} was edited`)
      this.props.history.push('/books-library/books')
    }
  }

  render () {
    if (this.state.book) {
      return (
        <div className='row'>
          <div className='col-md-offset-4 col-md-3'>
            <form className='book-form'>
              <h2>Edit Book</h2>
              <label>
                <div>Title:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='text' name='title' size='50' required
                  value={this.state.book.title}
                  onChange={this.handleUserChange} />
              </label>
              <label>
                <div>Image url:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='url' name='imageUrl' size='50'
                  value={this.state.book.imageUrl}
                  onChange={this.handleUserChange} />
              </label>
              <br />
              <label>
                <div>Author:</div>
                <input
                  className='form-control input-sm chat-input'    
                  type='text' name='author' required
                  value={this.state.book.author}
                  onChange={this.handleUserChange} />
              </label>
              <br />
              <label>
                <div>Description:</div>
                <textarea
                  className='form-control input-sm chat-input'
                  name='description' rows='10'
                  value={this.state.book.description}
                  onChange={this.handleUserChange} />
              </label>
              <br />
              <div>
                <span className='group-btn'>
                  <input
                    className='btn btn-primary btn-md'
                    value='Edit Book'
                    type='submit'
                    onClick={this.editBook} />
                </span>
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

export default EditBookPage

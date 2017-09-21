import React, { Component } from 'react'
import KinveyRequester from '../../utilities/KinveyRequester'
import Helpers from '../../utilities/Helpers'
import './Form.css'

class CreateBookPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: {
        title: '',
        author: '',
        description: '',
        imageUrl: '',
        addedByUser: ''
      }
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.createBook = this.createBook.bind(this)
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

  createBook (event) {
    event.preventDefault()
    const username = window.sessionStorage.getItem('username')
    KinveyRequester.createBook(
      this.state.book.title,
      this.state.book.author,
      this.state.book.description,
      this.state.book.imageUrl,
      username
    )
    .then(createBookSuccess.bind(this))
    function createBookSuccess () {
      Helpers.showInfo(`The book ${this.state.title} was created!`)
      this.props.history.push('/books-library/books')
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-md-offset-4 col-md-3'>
          <form className='book-form'>
            <h2>Create Book</h2>
            <label>
              <div>Title:</div>
              <input
                className='form-control input-sm chat-input'
                type='text' name='title' size='50' required
                value={this.state.book.title}
                onChange={this.handleUserChange} />
            </label>
            <br />
            <label>
              <div>Book image url (optional):</div>
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
            <span className='group-btn'>
              <input
                className='btn btn-primary btn-md'
                value='Create Book'
                type='submit'
                onClick={this.createBook} />
            </span>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateBookPage

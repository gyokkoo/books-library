import React, { Component } from 'react'
import KinveyRequester from '../KinveyRequester'
import Helpers from '../utilities/Helpers'

class CreateBookView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: {
        title: '',
        author: '',
        description: ''
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
    KinveyRequester.createBook(
      this.state.book.title,
      this.state.book.author,
      this.state.book.description
    )
    .then(createBookSuccess.bind(this))
    function createBookSuccess () {
      Helpers.showInfo(`The book ${this.state.title} was created!`)
      this.props.history.push('/books')
    }
  }

  render () {
    return (
      <form className='create-book-form'>
        <h1>Create Book</h1>
        <label>
          <div>Title:</div>
          <input type='text' name='title' size='35' required
            value={this.state.book.title}
            onChange={this.handleUserChange} />
        </label>
        <br />
        <label>
          <div>Author:</div>
          <input type='text' name='author' required
            value={this.state.book.author}
            onChange={this.handleUserChange} />
        </label>
        <br />
        <label>
          <div>Description:</div>
          <textarea name='description' rows='10'
            value={this.state.book.description}
            onChange={this.handleUserChange} />
        </label>
        <br />
        <div>
          <input type='submit' value='Create' onClick={this.createBook} />
        </div>
      </form>
    )
  }
}

export default CreateBookView

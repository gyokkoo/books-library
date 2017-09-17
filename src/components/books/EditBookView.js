import React, { Component } from 'react'
import KinveyRequester from '../../utilities/KinveyRequester'
import Helpers from '../../utilities/Helpers'

export default class EditBookView extends Component {
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
          description: book.description
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
    KinveyRequester.editBook(
      this.state.book.bookId,
      this.state.book.title,
      this.state.book.author,
      this.state.book.description
    )
    .then(editBookSuccess.bind(this))
    function editBookSuccess () {
      Helpers.showInfo(`The book ${this.state.title} was edited`)
      this.props.history.push('/books')
    }
  }

  render () {
    if (this.state.book) {
      return (
        <form className='edit-book-form'>
          <h1>Edit Book</h1>
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
            <input type='submit' value='Edit' onClick={this.editBook} />
          </div>
        </form>
      )
    } else {
      return null
    }
  }
}

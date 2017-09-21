import React, { Component } from 'react'
import KinveyRequester from '../../utilities/KinveyRequester'
import { Link } from 'react-router-dom'

// import Helpers from '../../utilities/Helpers'

class BookDetails extends Component {
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
  }

  componentDidMount () {
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

  // prepareBookForEdit (bookId) {
  //   KinveyRequester.findBookById(bookId)
  //     .then(loadBookForEditSuccess.bind(this))

  //   function loadBookForEditSuccess (bookInfo) {
  //     this.showView(
  //       <EditBookPage
  //         onsubmit={this.editBook.bind(this)}
  //         bookId={bookInfo._id}
  //         title={bookInfo.title}
  //         author={bookInfo.author}
  //         description={bookInfo.description}
  //       />
  //     )
  //   }
  // }

  render () {
    const book = this.state.book
    if (book) {
      return (
        <div className='text-center'>
          <img src={book.imageUrl} alt={book.title + ' book'} />
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
          <p>{book.description}</p>
          <div>Added by user: {book.addedByUser}</div>
          <Link to={`/books-library/edit-book/${book.bookId}`}>
            <button className='btn btn-primary'>Edit</button>
          </Link>
          &nbsp;
          <Link to={`/books-library/delete-book/${book.bookId}`}>
            <button className='btn btn-primary'>Delete</button>
          </Link>
        </div>
      )
    } else {
      return null
    }
  }
}

export default BookDetails

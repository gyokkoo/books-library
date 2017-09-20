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
        description: ''
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
          description: book.description
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
      console.log(this.state.book)
      return (
        <div className='text-center'>
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
          <p>{book.description}</p>

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

import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import './App.css'
import Helpers from './utilities/Helpers'

import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import Routes from './routes'

import CreateBookView from './views/CreateBookView'
import EditBookView from './views/EditBookView'
import DeleteBookView from './views/DeleteBookView'

import $ from 'jquery'
import KinveyRequester from './KinveyRequester'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      userId: null
    }
  }

  render () {
    return (
      <div className='App'>
        <NavigationBar />
        <div className='container'>
          <Routes />
          <header>
            <div id='loadingBox'>Loading ..</div>
            <div id='infoBox'>Info msg</div>
            <div id='errorBox'>Error msg</div>
          </header>
        </div>
        <Footer />
      </div>
    )
  }

  componentDidMount () {
    // Attach global AJAX "loading" event handlers
    $(document).on({
      ajaxStart: function () {
        $('#loadingBox').show()
      },
      ajaxStop: function () {
        $('#loadingBox').hide()
      }
    })

    // Attach a global AJAX error handler
    $(document).ajaxError(this.handleAjaxError.bind(this))

    // Load state
    this.setState({
      username: window.sessionStorage.getItem('username'),
      userId: window.sessionStorage.getItem('userId')
    })

    $('#errorBox, #infoBox').click(function () {
      $('#errorBox').hide()
    })
  }

  handleAjaxError (event, response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0) {
      errorMsg = 'Cannot connect due to network error.'
    }
    if (response.responseJSON && response.responseJSON.description) {
      errorMsg = response.responseJSON.description
    }

    Helpers.showError(errorMsg)
  }

  // confirmBookDelete (bookId) {
  //   KinveyRequester.findBookById(bookId)
  //     .then(loadBookForDeleteSuccess.bind(this))

  //   function loadBookForDeleteSuccess (bookInfo) {
  //     this.showView(
  //       <DeleteBookView
  //         onsubmit={this.deleteBook.bind(this)}
  //         bookId={bookInfo._id}
  //         title={bookInfo.title}
  //         author={bookInfo.author}
  //         description={bookInfo.description}
  //       />
  //     )
  //   }
  // }

  // createBook (title, author, description) {
  //   KinveyRequester.createBook(title, author, description).then(createBookSuccess.bind(this))

  //   function createBookSuccess () {
  //     this.showBooksView()
  //     this.showInfo('Book created')
  //   }
  // }
}

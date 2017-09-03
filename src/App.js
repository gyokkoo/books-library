import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'

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
            <div id='loadingBox'>Loading msg</div>
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

    this.showError(errorMsg)
  }

  showInfo (message) {
    $('#infoBox').text(message).show()
    setTimeout(function () {
      $('#infoBox').fadeOut()
    }, 3000)
  }

  showError (errorMsg) {
    $('#errorBox').text('Error: ' + errorMsg).show()
  }

  // showBooksView () {
  //   KinveyRequester.findAllBooks().then(loadBooksSuccess.bind(this))

  //   function loadBooksSuccess (books) {
  //     this.showView(<BooksView
  //       books={books}
  //       userId={this.state.userId}
  //       editBookClicked={this.prepareBookForEdit.bind(this)}
  //       deleteBookClicked={this.confirmBookDelete.bind(this)} />)
  //     this.showInfo('Books loaded')
  //   }
  // }

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

  confirmBookDelete (bookId) {
    KinveyRequester.findBookById(bookId)
      .then(loadBookForDeleteSuccess.bind(this))

    function loadBookForDeleteSuccess (bookInfo) {
      this.showView(
        <DeleteBookView
          onsubmit={this.deleteBook.bind(this)}
          bookId={bookInfo._id}
          title={bookInfo.title}
          author={bookInfo.author}
          description={bookInfo.description}
        />
      )
    }
  }

  showCreateBookView () {
    this.showView(<CreateBookView onsubmit={this.createBook.bind(this)} />)
  }

  createBook (title, author, description) {
    KinveyRequester.createBook(title, author, description).then(createBookSuccess.bind(this))

    function createBookSuccess () {
      this.showBooksView()
      this.showInfo('Book created')
    }
  }

  showEditBookView () {
    this.showView(<EditBookView onsubmit={this.editBook.bind(this)} />)
  }

  editBook (bookId, title, author, description) {
    KinveyRequester.editBook(bookId, title, author, description)
        .then(editBookSuccess.bind(this))

    function editBookSuccess () {
      this.showBooksView()
      this.showInfo('Book created.')
    }
  }

  deleteBook (bookId) {
    KinveyRequester.deleteBook(bookId)
          .then(deleteBookSuccess.bind(this))

    function deleteBookSuccess () {
      this.showBooksView()
      this.showInfo('Book deleted.')
    }
  }

  // login (username, password) {
  //   KinveyRequester.loginUser(username, password).then(loginSuccess.bind(this))

  //   function loginSuccess (userInfo) {
  //     this.saveAuthInSession(userInfo)
  //     this.showBooksView()
  //     this.showInfo('You have successfully logged in')
  //   }
  // }

  // register (username, password) {
  //   KinveyRequester.registerUser(username, password).then(registerSuccess.bind(this))

  //   function registerSuccess (userInfo) {
  //     this.saveAuthInSession(userInfo)
  //     this.showBooksView()
  //     this.showInfo('You have successfully registered')
  //   }
  // }

  saveAuthInSession (userInfo) {
    window.sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
    window.sessionStorage.setItem('userId', userInfo._id)
    window.sessionStorage.setItem('username', userInfo.username)

    // This will update the entire app UI (e.g. the navigation bar)
    this.setState({
      username: userInfo.username,
      userId: userInfo._id
    })
  }

  logout () {
    KinveyRequester.logoutUser()
    window.sessionStorage.clear()
    this.setState({
      username: null,
      userId: null
    })
    this.showHomeView()
    this.showInfo('You have successfully logged out')
  }
}

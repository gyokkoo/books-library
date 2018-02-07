import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import KinveyRequester from '../utilities/KinveyRequester'

class BookStore extends EventEmitter {
  constructor () {
    super()
    this.books = ''
  }

  getAllBooks () {
    KinveyRequester.findAllBooks().then(loadBooksSuccess.bind(this))
    function loadBooksSuccess (books) {
      this.state({
        books
      })
    }
  }

  handleAction (action) {
    switch (action) {
      case 'GET_ALL_BOOKS':
        this.getAllBooks(action.books)
        break
      default:
        console.log('Invalid action!')
        break
    }
  }
}

let bookStore = new BookStore()
dispatcher.register(bookStore.handleAction.bind(bookStore))
export default bookStore

import dispatcher from '../dispatcher'

let bookActions = {
  getAllBooks: (books) => {
    dispatcher.dispatch({
      type: 'GET_ALL_BOOKS',
      books
    })
  }
}

export default bookActions

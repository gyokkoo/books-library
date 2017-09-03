import $ from 'jquery'

class Helpers {
  static showInfo (message) {
    $('#infoBox').text(message).show()
    setTimeout(function () {
      $('#infoBox').fadeOut()
    }, 3000)
  }

  static showError (errorMsg) {
    $('#errorBox').text('Error: ' + errorMsg).show()
  }
}

export default Helpers

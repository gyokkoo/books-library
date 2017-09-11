import React, { Component } from 'react'
import './App.css'
import Helpers from './utilities/Helpers'

import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import Routes from './routes'

import $ from 'jquery'

export default class App extends Component {
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
}

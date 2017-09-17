import { Component } from 'react'
import Helpers from '../../utilities/Helpers'
import KinveyRequester from '../../utilities/KinveyRequester'

class Logout extends Component {
  componentWillMount () {
    KinveyRequester.logoutUser().then(logoutSuccess.bind(this))
    function logoutSuccess () {
      window.sessionStorage.clear()
      Helpers.showInfo('You have successfully logged out')
      this.props.history.push('/home')
    }
  }

  render () {
    return (
      null
    )
  }
}

export default Logout

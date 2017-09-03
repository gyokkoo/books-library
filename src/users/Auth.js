class Auth {
  static authenticateUser (token) {
    window.sessionStorage.setItem('authToken', token)
  }
  static isUserAuthenticated () {
    return window.sessionStorage.getItem('authToken') !== null
  }
  static deauthenticateUser () {
    window.sessionStorage.removeItem('authToken')
  }
  static getToken () {
    return window.sessionStorage.getItem('authToken')
  }
}

export default Auth

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onSubmitSuccess = JWTtoken => {
    const {history} = this.props
    Cookies.set('jwt_token', JWTtoken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      isShowPassword,
      showSubmitError,
      errorMsg,
    } = this.state

    const showPassword = isShowPassword ? 'text' : 'password'

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          className="login-image-desktop"
          alt="website login"
          src="https://res.cloudinary.com/da7ik4khq/image/upload/v1690705648/Mini%20Project/Rectangle_1467_1x_tq84jr.png"
        />
        <img
          src="https://res.cloudinary.com/da7ik4khq/image/upload/v1690709962/Mini%20Project/Ellipse_99_1x_luqqia.png"
          className="login-image-mobile"
          alt="website login"
        />
        <div className="form-container">
          <img
            src="https://res.cloudinary.com/da7ik4khq/image/upload/v1690703495/Mini%20Project/Group_7731_1x_neqs9z.png"
            className="login-website-logo"
            alt="login website logo"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <label className="user-name" htmlFor="username">
              Username*
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              className="custom-input"
              onChange={this.onChangeUsername}
            />
            <label className="password" htmlFor="password">
              Password*
            </label>
            <input
              id="password"
              type={showPassword}
              placeholder="Password"
              value={password}
              className="custom-input"
              onChange={this.onChangePassword}
            />
            <div className="show-pwd-container">
              <input
                onClick={this.toggleShowPassword}
                id="showPassword"
                type="checkbox"
              />
              <label className="show-password" htmlFor="showPassword">
                Show Password
              </label>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login

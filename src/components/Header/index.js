import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import HamburgerMenu from '../HamburgerMenu'
import './index.css'

const Header = props => {
  const {isActive} = props

  const active = isActive ? 'active' : ''
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/" className="link">
        <img
          src="https://res.cloudinary.com/da7ik4khq/image/upload/v1690703495/Mini%20Project/Group_7731_1x_neqs9z.png"
          className="app-logo"
          alt="website logo"
        />
      </Link>

      <div className="header-sub-container">
        <nav className="header-nav-container">
          <ul className="ul-list">
            <li className={`home-text ${active}`}>
              <Link className="link-item" to="/">
                Home
              </Link>
            </li>

            <li className={`shelves-text ${active}`}>
              <Link className="link-item" to="/shelf">
                Bookshelves
              </Link>
            </li>
          </ul>
        </nav>
        <button onClick={onClickLogout} className="logout-button" type="button">
          Logout
        </button>
      </div>
      <HamburgerMenu isActive={isActive} onClickLogout={onClickLogout} />
    </div>
  )
}

export default withRouter(Header)

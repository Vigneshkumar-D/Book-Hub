import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import './index.css' // Import the CSS for this component

class HamburgerMenu extends Component {
  state = {
    isOpen: false,
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  render() {
    const {isOpen} = this.state
    const {location} = this.props
    console.log(location.pathname)

    const {onClickLogout} = this.props
    const homeActive = location.pathname === '/' ? 'active' : ''
    const shelfActive = location.pathname === '/shelf' ? 'active' : ''

    return (
      <div className="hamburger-main-menu">
        <button type="button" className="menu-icon" onClick={this.toggleMenu}>
          <GiHamburgerMenu className="" size="25" />
        </button>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <button
            className="close-button"
            type="button"
            onClick={this.toggleMenu}
          >
            <IoMdClose size="25" color="#616e7c" />
          </button>
          <ul>
            <li>
              <Link className="nav-link" to="/">
                <p className={`nav-link-content ${homeActive}`}>Home</p>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/shelf">
                <p className={`nav-link-content ${shelfActive}`}>Bookshelves</p>
              </Link>
            </li>
          </ul>
          <button
            onClick={onClickLogout}
            className="hamburger-menu-logout-button"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(HamburgerMenu)

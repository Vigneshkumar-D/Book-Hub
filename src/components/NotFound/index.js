import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-fount-image"
      src="https://res.cloudinary.com/da7ik4khq/image/upload/v1692898684/Mini%20Project/Group_7484_fqeenf.png"
      alt="not found"
    />
    <h1 className="not-found-title">Page Not Found</h1>
    <p className="not-found-des">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>

    <Link className="link" to="/">
      <button className="back-to-home-btn" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound

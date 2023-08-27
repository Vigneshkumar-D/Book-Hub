import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  notFound: 'NOT_FOUND',
}

class BookDetails extends Component {
  state = {apiStatus: apiStatusConstant.initial, bookDetailList: {}}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response.status)
    if (response.ok) {
      const data = await response.json()
      const updatedDate = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        title: data.book_details.title,
        readStatus: data.book_details.read_status,
        rating: data.book_details.rating,
        aboutBook: data.book_details.about_book,
        aboutAuthor: data.book_details.about_author,
      }

      this.setState({
        bookDetailList: updatedDate,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="book-details-failure-view-container">
      <img
        className="book-details-failure-view-image"
        src="https://res.cloudinary.com/da7ik4khq/image/upload/v1690715005/Mini%20Project/Group_7522_1x_brolaa.png"
        alt="failure view"
      />
      <p className="book-details-failure-description">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        onClick={this.getBookDetails}
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  successView = () => {
    const {bookDetailList} = this.state
    return (
      <div className="book-details-success-container">
        <div className="book-details-sub-top-container">
          <img
            className="book-image-details"
            src={bookDetailList.coverPic}
            alt={bookDetailList.title}
          />
          <div className="book-details-list-sub-container">
            <h1 className="book-details-title">{bookDetailList.title}</h1>
            <p className="author-name-book-details">
              {bookDetailList.authorName}
            </p>
            <div className="avg-rating-container">
              <p className="avg-rating-title-book-details">Avg Rating</p>
              <BsFillStarFill className="book-details-star-icon" />
              <p className="book-details-rating">{bookDetailList.rating}</p>
            </div>
            <p className="book-details-reading-status">
              Status:
              <span className="book-details-span">
                {bookDetailList.readStatus}
              </span>
            </p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="book-details-sub-bottom-container">
          <h1 className="about-author-title">About Author</h1>
          <p className="author-description">{bookDetailList.aboutAuthor}</p>
          <h1 className="about-book-title">About Book</h1>
          <p className="book-description">{bookDetailList.aboutBook}</p>
        </div>
      </div>
    )
  }

  renderPages = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.loadingView()
      case apiStatusConstant.failure:
        return this.failureView()
      case apiStatusConstant.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    const {bookDetailList} = this.state
    console.log(bookDetailList)
    return (
      <div className="book-details-container">
        <Header />
        <div className="book-details-top-container">{this.renderPages()}</div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }
}
export default BookDetails

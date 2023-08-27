import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
}

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {topRatedBookList: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getTopRatedBookList()
  }

  getTopRatedBookList = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedDate = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))

      this.setState({
        topRatedBookList: updatedDate,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  successView = () => (
    <>
      <Link className="find-books-link-mobile" to="/shelf">
        <button className="find-books-button-mobile" type="button">
          Find Books
        </button>
      </Link>
      <div className="top-rated-book-container">
        <div className="top-container">
          <h1 className="top-rated-book-heading">Top Rated Books</h1>
          <Link to="/shelf">
            <button className="find-books-button" type="button">
              Find Books
            </button>
          </Link>
        </div>
        {this.renderSlider()}
      </div>
    </>
  )

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/da7ik4khq/image/upload/v1690715005/Mini%20Project/Group_7522_1x_brolaa.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-description">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        onClick={this.getTopRatedBookList}
        className="retry-button"
      >
        Try Again
      </button>
    </div>
  )

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

  renderSlider = () => {
    const {topRatedBookList} = this.state

    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {topRatedBookList.map(eachBook => {
            const {id, coverPic, authorName, title} = eachBook
            return (
              <li className="slide-item" key={id}>
                <Link className="slide-link-items" to={`/books/${id}`}>
                  <img className="cover-pic" src={coverPic} alt={title} />
                  <h1 className="title">{title}</h1>
                  <p className="author-name">{authorName}</p>
                </Link>
              </li>
            )
          })}
        </Slider>
      </ul>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="home-container">
        <div>
          <Header />

          <div className="home-sub-container">
            <h1 className="find-your-next-book-heading">
              Find Your Next Favorite Books?
            </h1>
            <p className="find-your-next-book-des">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            {this.renderPages()}
          </div>
        </div>
        <Footer className="footer" />
      </div>
    )
  }
}

export default Home

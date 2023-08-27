import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import SideBar from '../SideBar'
import Header from '../Header'
import Footer from '../Footer'
import BookItems from '../BookItems'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  notFound: 'NOT_FOUND',
}

class BookShelves extends Component {
  state = {
    allBookList: [],
    apiStatus: apiStatusConstant.initial,
    bookshelfName: bookshelvesList[0].value,
    searchText: '',
    activeTab: bookshelvesList[0].id,
    header: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getAllBooks()
  }

  onChangeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.getAllBooks()
    }
  }

  onClickSearchIcon = () => {
    this.getAllBooks()
  }

  changeTab = clickedTab => {
    let activeValue = ''
    let activeTab = ''
    for (let i = 0; i < bookshelvesList.length; i += 1) {
      const eachItem = bookshelvesList[i]
      if (eachItem.label === clickedTab) {
        activeValue = eachItem.value
        activeTab = eachItem.id
        break
      }
    }
    this.setState(
      {bookshelfName: activeValue, header: clickedTab, activeTab},
      () => {
        this.componentDidMount()
      },
    )
  }

  changeTabMobile = event => {
    const clickedTab = event.target.textContent
    this.changeTab(clickedTab)
  }

  getAllBooks = async () => {
    const {bookshelfName, searchText} = this.state
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
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
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
      }))
      if (updatedDate.length > 0) {
        this.setState({
          allBookList: updatedDate,
          apiStatus: apiStatusConstant.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstant.notFound,
        })
      }
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {allBookList} = this.state

    return (
      <div className="bookshelves-success-container">
        <nav className="books-list-container">
          <ul className="books-list">
            {allBookList.map(eachBook => (
              <BookItems eachBook={eachBook} key={eachBook.id} />
            ))}
          </ul>
        </nav>
        <Footer />
      </div>
    )
  }

  notFound = () => {
    const {searchText} = this.state
    return (
      <div className="not-found-view-container">
        <img
          className="not-found-view-image"
          src="https://res.cloudinary.com/da7ik4khq/image/upload/v1692462644/Mini%20Project/Group_scb4rc.png"
          alt="no books"
        />
        <p className="not-found-description">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://res.cloudinary.com/da7ik4khq/image/upload/v1690715005/Mini%20Project/Group_7522_1x_brolaa.png"
        alt="failure view"
      />
      <p className="failure-description">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        onClick={this.getAllBooks}
        className="try-again-btn"
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
      case apiStatusConstant.notFound:
        return this.notFound()
      default:
        return null
    }
  }

  render() {
    const {searchText, header, activeTab} = this.state
    return (
      <div className="shelves-main-container">
        <Header />
        <div className="shelves-container">
          <div className="shelves-left-container">
            <h1 className="bookshelves-heading">Bookshelves</h1>
            <SideBar activeTab={activeTab} changeTab={this.changeTab} />
          </div>

          <div className="shelves-right-container">
            <div className="bookshelves-success-sub-container">
              <h1 className="bookshelves-name">{header} Books</h1>
              <h1 className="bookshelves-heading-mobile">BookShelves</h1>
              <div className="search-icon-container">
                <input
                  placeholder="Search"
                  value={searchText}
                  onChange={this.onChangeSearchText}
                  onKeyDown={this.onKeyPress}
                  type="search"
                  className="search-input"
                />
                <button
                  type="button"
                  className="search-btn"
                  testid="searchButton"
                >
                  <BsSearch
                    onClick={this.onClickSearchIcon}
                    className="search-icon"
                  />
                </button>
              </div>
              <nav className="nav-items-mobile">
                <div className="nav-mobile-mobile">
                  {bookshelvesList.map(eachContent => {
                    const isClicked =
                      eachContent.id === activeTab
                        ? 'active_text-mobile'
                        : 'normal_text-mobile'
                    return (
                      <button
                        onClick={this.changeTabMobile}
                        className={isClicked}
                        key={eachContent.label}
                        type="button"
                      >
                        {eachContent.label}
                      </button>
                    )
                  })}
                </div>
              </nav>
            </div>
            {this.renderPages()}
          </div>
        </div>
      </div>
    )
  }
}
export default BookShelves

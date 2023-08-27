import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItems = props => {
  const {eachBook} = props
  const {id, authorName, coverPic, title, readStatus, rating} = eachBook
  return (
    <Link className="link-items" to={`/books/${id}`}>
      <li className="book-list-items">
        <div className="img-container">
          <img className="book-image" src={coverPic} alt={title} />
        </div>
        <div className="book-list-sub-container">
          <h1 className="book-item-book-title">{title}</h1>
          <p className="book-item-author-name">{authorName}</p>
          <div className="book-items-avg-rating-container">
            <p className="avg-rating-title">Avg Rating</p>
            <BsFillStarFill className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
          <p className="reading-status">
            Status: <span className="span">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}
export default BookItems

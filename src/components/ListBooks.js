import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'


class ListBooks extends Component {
  static propTypes = {
    shelfData: PropTypes.array.isRequired
  };

  render() {
    let shelfData = this.props.shelfData;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>{shelfData.map((data)=>(
            <BookShelf key={data.bookShelfTitle} bookshelfTitle={data.bookShelfTitle}
              bookshelfBooks={data.bookShelfBooks}
              bookUpdater={data.bookUpdater}
            /> ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
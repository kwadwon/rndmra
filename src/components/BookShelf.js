import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid'

class BookShelf extends Component {
  static propTypes = {
    bookshelfTitle: PropTypes.string.isRequired,
    bookshelfBooks: PropTypes.array.isRequired,
    bookUpdater: PropTypes.func.isRequired
  };

  render() {
    const { bookshelfTitle, bookshelfBooks, bookUpdater } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <BooksGrid books={bookshelfBooks} bookUpdater={bookUpdater}/>
        </div>
      </div>
    )
  }
}

export default BookShelf
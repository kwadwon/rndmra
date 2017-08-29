import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

class SearchBooks extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    updateQuery: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired,
    bookUpdater: PropTypes.func.isRequired
  };

  render() {
    let { query, updateQuery, searchResults, bookUpdater } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"
            className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event)=>updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BooksGrid books={searchResults} bookUpdater={bookUpdater} />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    updateBook: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    bookCopy: PropTypes.object
  };

  render() {
    const { backgroundImage, title, authors, shelf, updateBook, id, bookCopy } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${backgroundImage}")`
            }}>
          </div>
          <div className="book-shelf-changer">
            <select defaultValue={shelf}
              onChange={(event) => { updateBook({ id: id, prevShelf: shelf }, event.target.value, bookCopy) }}>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(", ")}</div>
      </div>
    )
  }
}

export default Book
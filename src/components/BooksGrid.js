import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class BooksGrid extends Component{
   static propTypes = {
     books: PropTypes.array.isRequired,
     bookUpdater: PropTypes.func.isRequired
   };

   render(){
     let { books, bookUpdater } = this.props;

     return (
      <ol className="books-grid">{
        books.map((book) => (
          <li key={book.id}>
            <Book
              backgroundImage={book.imageLinks.thumbnail}
              title={book.title}
              id={book.id}
              authors={book.authors}
              shelf={book.shelf}
              updateBook={bookUpdater}
              bookCopy={book}
            />
          </li>
        ))}
      </ol>
     )
   }
}

export default BooksGrid
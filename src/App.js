import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    read: [],
    wantToRead: [],
    none: [],
    query: '',
    searchResults: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let newState = {
        currentlyReading: [],
        read: [],
        wantToRead: [],
        allBooks: []
      };

      books.forEach((book) => {
        newState[book.shelf].push(book);
      })

      this.setState(newState);
    })
  }

  updateBook = (book, shelf, bookCopy) => {
    BooksAPI.update(book, shelf);
    this.setState((prevState) => {

      //update the shelf the book is in
      let bookIndex = prevState[book.prevShelf].findIndex((originalBook) => originalBook.id === book.id);
      let bookToRemove = bookCopy;
      if (bookIndex > 0) {
        bookToRemove = prevState[book.prevShelf].splice(bookIndex, 1)[0];
      }
      bookToRemove.shelf = shelf;
      prevState[shelf].push(bookToRemove);

      //update the copy in searchResults
      let searchCopy = prevState['searchResults'].find((result) => result.id === book.id);
      searchCopy && (searchCopy.shelf = shelf);

      return prevState;
    })
  };

  updateQuery = (query) => {
    let trimmedQuery = query.trim();
    let operatingBooks = [];

    if (trimmedQuery) {
      BooksAPI.search(trimmedQuery)
        .then((books) => {
          operatingBooks = books || [];
          operatingBooks.map((book) => {
            book.shelf = (this.state['currentlyReading'].find((currentlyReadingBook) => (currentlyReadingBook.id === book.id))
              || this.state['read'].find((readBook) => (readBook.id === book.id))
              || this.state['wantToRead'].find((wantToRead) => (wantToRead.id === book.id))
              || { shelf: 'none' })['shelf'];
            return book;
          })

          this.setState({ searchResults: operatingBooks })
        })
    }
    this.setState({ query: trimmedQuery, searchResults: operatingBooks })
  };

  render() {
    let shelfData = [
      { bookShelfTitle: 'Currently Reading', bookShelfBooks: this.state.currentlyReading, bookUpdater: this.updateBook },
      { bookShelfTitle: 'Read', bookShelfBooks: this.state.read, bookUpdater: this.updateBook },
      { bookShelfTitle: 'Want to Read', bookShelfBooks: this.state.wantToRead, bookUpdater: this.updateBook }
    ];

    let { query, searchResults } = this.state;

    return (
      <div className='app'>
        <Route path='/search' render={() => (
          <SearchBooks query={query}
            updateQuery={this.updateQuery}
            searchResults={searchResults}
            bookUpdater={this.updateBook} />
        )} />

        <Route exact path='/' render={() => (
          <ListBooks shelfData={shelfData} />
        )} />
      </div>
    )
  }
}

export default BooksApp

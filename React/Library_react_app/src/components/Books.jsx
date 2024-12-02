import { useEffect, useState } from 'react';
import Book from './Book';

function LibraryAnalytics(props) {
  const { books, rentBook, returnBook } = props;

  console.log(books);
  const [search, useSearch] = useState('');
  const [filtredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    if (search) {
      setFilteredBooks(
        books.filter((book) =>
          book.bookName.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else setFilteredBooks(books);
  }, [search, books]);

  return (
    <div>
      <h2>Books</h2>
      <input
        type="text"
        placeholder="Book Name"
        value={search}
        onChange={(e) => useSearch(e.target.value)}
      />
      <div className="books">
        {filtredBooks.map((book, index) => (
          <div className="book-card">
            <Book book={book} />
            {book.isAvailable ? (
              <button onClick={() => rentBook(book.bookName, 'Alice')}>
                Rent
              </button>
            ) : (
              <button onClick={() => returnBook(book.bookName, 'Alice')}>
                Return
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LibraryAnalytics;

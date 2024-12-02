import { useState } from 'react';
import './App.css';
import Library from './components/Library';
import Books from './components/Books';
import AddBook from './components/AddBook';

function App() {
  const libraryName = 'Bahcesehir';
  const initialBooks = [
    {
      bookName: 'Amat',
      imageSource: '', //put image link into imageSource's value
      writer: 'Ihsan Oktay Anar',
      category: 'Fiction',
      isAvailable: true,
      borrowHistory: [],
    },
    {
      bookName: 'Olasılıksız',
      imageSource: '',
      writer: 'Adam Fawer',
      category: 'Thriller',
      isAvailable: true,
      borrowHistory: [],
    },
    {
      bookName: 'Empati',
      imageSource: '',
      writer: 'Adam Fawer',
      category: 'Thriller',
      isAvailable: false,
      borrowHistory: [
        { user: 'Alice', date: '2024-11-25', dueDate: '2024-11-30' },
      ],
    },
    {
      bookName: '1984',
      imageSource: '',
      writer: 'George Orwell',
      category: 'Dystopia',
      isAvailable: true,
      borrowHistory: [],
    },
  ];

  const initialUsers = [
    {
      username: 'Alice',
      borrowedBooks: [],
      fines: 0,
    },
    {
      username: 'Bob',
      borrowedBooks: [],
      fines: 0,
    },
  ];

  const [books, setBooks] = useState(initialBooks);
  const [users, setUsers] = useState(initialUsers);

  function findUser(username) {
    return users.find((user) => user.username === username);
  }

  // Rent a book with due date and fine tracking
  function rentBook(bookName, username) {
    const tempBooks = [...books];

    console.log('temp: ', tempBooks);

    const user = findUser(username);
    if (!user) {
      console.log(`User "${username}" not found.`);
      return;
    }

    const book = tempBooks.find((book) => book.bookName === bookName);
    if (!book) {
      console.log(`Book "${bookName}" not found.`);
      return;
    }
    if (!book.isAvailable) {
      console.log(`Book "${bookName}" is already rented.`);
      return;
    }

    console.log('Book B: ', book);

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7); // Due in 7 days

    book.isAvailable = false;
    book.borrowHistory.push({
      user: username,
      date: new Date().toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
    });

    console.log(
      `${username} successfully rented "${bookName}". Due date: ${
        dueDate.toISOString().split('T')[0]
      }`
    );

    console.log('Book A: ', book);
    setBooks(tempBooks);
  }

  // Return a book and calculate overdue fines
  function returnBook(bookName, username) {
    const tempBooks = [...books];
    const user = findUser(username);
    if (!user) {
      console.log(`User "${username}" not found.`);
      return;
    }

    const book = tempBooks.find((book) => book.bookName === bookName);
    if (!book) {
      console.log(`Book "${bookName}" not found.`);
      return;
    }
    if (book.isAvailable) {
      console.log(`Book "${bookName}" is not currently rented.`);
      return;
    }

    const borrowHistory = book.borrowHistory.find(
      (entry) => entry.user === username
    );
    if (!borrowHistory) {
      console.log(`${username} did not rent "${bookName}".`);
      return;
    }

    // Check for overdue fine
    const today = new Date();
    const dueDate = new Date(borrowHistory.dueDate);
    if (today > dueDate) {
      const overdueDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
      console.log(
        `${username} returned "${bookName}" late by ${overdueDays} days. Total Fines: ${user.fines}`
      );
    } else {
      console.log(`${username} successfully returned "${bookName}" on time.`);
    }

    // Update availability and remove from user's borrowed list
    book.isAvailable = true;
    user.borrowedBooks = user.borrowedBooks.filter(
      (b) => b.bookName !== bookName
    );
    book.borrowHistory = book.borrowHistory.filter(
      (entry) => entry.user !== username
    );
    setBooks(tempBooks);
  }

  const addNewBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <>
      <h1>{libraryName}</h1>
      <Library />
      <Books books={books} rentBook={rentBook} returnBook={returnBook} />
      <AddBook addNewBook={addNewBook} />
    </>
  );
}

export default App;

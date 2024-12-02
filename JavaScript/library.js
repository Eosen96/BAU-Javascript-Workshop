// Library code written in workshop

const library = {
  libraryName: "Summit",
  workingHours: [8, 23],
  foundIn: 1987,
  books: {
    1: {
      id: 1,
      bookName: "Amat",
      writer: "Ihnas Oktay Anar",
      isAvailable: true,
      borrowHistory: [],
    },
    2: {
      id: 1,
      bookName: "Olasılıksız",
      writer: "Adam Fawer",
      isAvailable: true,
      borrowHistory: [],
    },
    3: {
      id: 1,
      bookName: "Empati",
      writer: "Adam Fawer",
      isAvailable: true,
      borrowHistory: [],
    },
    4: {
      id: 1,
      bookName: "1984",
      writer: "George Orwell",
      isAvailable: true,
      borrowHistory: [],
    },
  },
  users: {
    312: {
      username: "Alice",
      borrowedBooks: [],
    },
    213: {
      username: "Bob",
      borrowedBooks: [],
    },
  },
  maxBorrowLimit: 2,
};

function rentBook(bookName, userName) {
  const book = Object.values(library.books).find(
    (book) => book.bookName === bookName
  );

  const user = Object.values(library.users).find(
    (user) => userName === user.username
  );

  if (!book) {
    console.log("Book: ", bookName, " is not listed in the library");
    return;
  }

  if (!user) {
    console.log("User: ", userName, " is not registered!");
    return;
  }

  if (!book.isAvailable) {
    console.log("Book: ", book.bookName, " is not available!");
    return;
  }

  book.isAvailable = false;
  user.borrowedBooks.push(book);

  const date = new Date();
  date.setDate(date.getDate() + 7);
  console.log(date);

  const rentedBook = {
    user,
    dueDate: date,
  };
  book.borrowHistory.push(rentedBook);

  console.log("Book is succesfully rented", book.bookName, user.username);
}

function returnBook(bookName, userName) {
  const book = Object.values(library.books).find(
    (book) => book.bookName === bookName
  );

  const user = Object.values(library.users).find(
    (user) => userName === user.username
  );

  if (!book) {
    // can be made function to apply DRY
    console.log("Book: ", bookName, " is not listed in the library");
    return;
  }

  if (!user) {
    console.log("User: ", userName, " is not registered!");
    return;
  }

  if (book.isAvailable) {
    console.log("Book: ", book.bookName, " has been already available!");
    return;
  }

  book.isAvailable = true;
  console.log("Book is succesfully returned", book.bookName, user.username);
}

// Test Operations
rentBook("Amat", "Alice");
returnBook("Amat", "Alice");
rentBook("Amat", "Bob");
rentBook("Amat", "Bo2b");
rentBook("Ahmat", "Bo2b");

//console.log(library);

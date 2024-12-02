//Better and more complex version of the library code.

const library = {
  libraryName: "Wisdom",
  address: "Besiktas, Istanbul",
  foundIn: 1987,
  workingHours: {
    open: 8,
    close: 24,
  },
  books: {
    1: {
      id: 1,
      bookName: "Amat",
      writer: "Ihsan Oktay Anar",
      category: "Fiction",
      isAvailable: true,
      borrowHistory: [],
    },
    2: {
      id: 2,
      bookName: "Olasılıksız",
      writer: "Adam Fawer",
      category: "Thriller",
      isAvailable: true,
      borrowHistory: [],
    },
    3: {
      id: 3,
      bookName: "Empati",
      writer: "Adam Fawer",
      category: "Thriller",
      isAvailable: true,
      borrowHistory: [
        { user: "Alice", date: "2024-11-25", dueDate: "2024-11-30" },
      ],
    },
    4: {
      id: 4,
      bookName: "1984",
      writer: "George Orwell",
      category: "Dystopia",
      isAvailable: true,
      borrowHistory: [],
    },
  },
  users: [
    {
      username: "Alice",
      borrowedBooks: [],
      fines: 0,
    },
    {
      username: "Bob",
      borrowedBooks: [],
      fines: 0,
    },
  ],
  maxBorrowLimit: 3,
  finePerDay: 5, // Fine in currency units per overdue day
  logs: [],
};

// Utility function to log actions
function logAction(action) {
  const timestamp = new Date().toISOString();
  library.logs.push({ action, timestamp });
}

// Utility function to display books
function displayBooks(books) {
  if (books.length === 0) {
    console.log("No books found.");
    return;
  }
  books.forEach((book) => {
    console.log(
      `Book Name: ${book.bookName}, Writer: ${book.writer}, Category: ${book.category}, Available: ${book.isAvailable}`
    );
  });
}

// Utility function to find user by username
function findUser(username) {
  return library.users.find((user) => user.username === username);
}

// Register a new user
function registerUser(username) {
  if (findUser(username)) {
    console.log(`User "${username}" already exists.`);
    return;
  }
  library.users.push({ username, borrowedBooks: [], fines: 0 });
  console.log(`User "${username}" successfully registered.`);
  logAction(`User "${username}" registered.`);
}

// Rent a book with due date and fine tracking
function rentBook(bookName, username) {
  const user = findUser(username);
  if (!user) {
    console.log(`User "${username}" not found.`);
    return;
  }

  const userBorrowedBooks = user.borrowedBooks.length;
  if (userBorrowedBooks >= library.maxBorrowLimit) {
    console.log(
      `${username} has reached the borrowing limit of ${library.maxBorrowLimit} books.`
    );
    return;
  }

  const book = Object.values(library.books).find(
    (book) => book.bookName === bookName
  );
  if (!book) {
    console.log(`Book "${bookName}" not found.`);
    return;
  }
  if (!book.isAvailable) {
    console.log(`Book "${bookName}" is already rented.`);
    return;
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7); // Due in 7 days

  book.isAvailable = false;
  book.borrowHistory.push({
    user: username,
    date: new Date().toISOString().split("T")[0],
    dueDate: dueDate.toISOString().split("T")[0],
  });
  user.borrowedBooks.push({
    bookName,
    dueDate: dueDate.toISOString().split("T")[0],
  });

  console.log(
    `${username} successfully rented "${bookName}". Due date: ${
      dueDate.toISOString().split("T")[0]
    }`
  );
  logAction(
    `"${bookName}" rented by "${username}" with due date "${
      dueDate.toISOString().split("T")[0]
    }"`
  );
}

// Return a book and calculate overdue fines
function returnBook(bookName, username) {
  const user = findUser(username);
  if (!user) {
    console.log(`User "${username}" not found.`);
    return;
  }

  const book = Object.values(library.books).find(
    (book) => book.bookName === bookName
  );
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
    const fine = overdueDays * library.finePerDay;
    user.fines += fine;
    console.log(
      `${username} returned "${bookName}" late by ${overdueDays} days. Fine: ${fine}. Total Fines: ${user.fines}`
    );
  } else {
    console.log(`${username} successfully returned "${bookName}" on time.`);
  }

  // Update availability and remove from user's borrowed list
  book.isAvailable = true;

  logAction(`"${bookName}" returned by "${username}"`);
}

// View library analytics
function viewLibraryAnalytics() {
  const totalBooks = Object.values(library.books).length;
  const availableBooks = Object.values(library.books).filter(
    (book) => book.isAvailable
  ).length;
  const borrowedBooks = totalBooks - availableBooks;
  const mostBorrowedBook = Object.values(library.books)
    .map((book) => ({
      bookName: book.bookName,
      borrowCount: book.borrowHistory.length,
    }))
    .sort((a, b) => b.borrowCount - a.borrowCount)[0];

  console.log(`Library Analytics:`);
  console.log(`Total Books: ${totalBooks}`);
  console.log(`Available Books: ${availableBooks}`);
  console.log(`Borrowed Books: ${borrowedBooks}`);
  if (mostBorrowedBook) {
    console.log(
      `Most Borrowed Book: "${mostBorrowedBook.bookName}" (${mostBorrowedBook.borrowCount} times)`
    );
  }
}

function findBooks(word) {
  return Object.values(library.books).filter((book) =>
    book.bookName.toLowerCase().includes(word.toLowerCase())
  );
}

// Test Operations
console.log("\nRegistering Users:");
registerUser("Charlie");
registerUser("Alice"); // Should show user already exists

console.log("\nRenting Books:");
rentBook("1984", "Alice");
rentBook("Empati", "Charlie");
rentBook("Empati", "Alice");

console.log("\nReturning Books with Fine:");
returnBook("Empati", "Charlie");
rentBook("Empati", "Charlie");

returnBook("Empati", "Charlie");
rentBook("Empati", "Charlie");

console.log("\nView Library Analytics:");
viewLibraryAnalytics();

console.log("Find Books by A", findBooks("a"));
console.log(library.books[3].borrowHistory);

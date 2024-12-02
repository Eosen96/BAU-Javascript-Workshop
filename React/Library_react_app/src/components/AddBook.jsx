import React, { useState } from 'react';

function AddBook({ addNewBook }) {
  const [bookName, setBookName] = useState('');
  const [writer, setWriter] = useState('');
  const [imageSource, setImageSource] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName || !writer || !imageSource) {
      alert('All fields are required!');
      return;
    }

    addNewBook({
      bookName,
      writer,
      imageSource,
      isAvailable: true,
      borrowHistory: [],
    });
    setBookName('');
    setWriter('');
    setImageSource('');
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Writer"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image Source"
          value={imageSource}
          onChange={(e) => setImageSource(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;

function Book(props) {
  const { book } = props;

  return (
    <>
      <img src={book.imageSource} />
      <div>
        {book.bookName} by {book.writer}
      </div>
    </>
  );
}

export default Book;

import React, { useState, useEffect } from 'react';

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState('');
  const [filterBooks, setBooks] = useState([]);
  useEffect(() => {
    if (books.data) {
      setBooks(books.data.allBooks);
    }
  }, [books]);
  const submit = async (event) => {
    event.preventDefault();
    if (genre === '') {
      setBooks(books.data.allBooks);
    } else {
      await setBooks(
        books.data.allBooks.filter((book) => book.genres.includes(genre))
      );
      console.log(filterBooks);
      // if (!filterBooks) setBooks([]);
    }
  };
  if (!show) {
    return null;
  }

  return books.loading ? (
    'loading'
  ) : (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          Genre
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
        </div>
        <button type="submit">Filter by Genre</button>
      </form>
    </div>
  );
};

export default Books;

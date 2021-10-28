import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { useQuery } from '@apollo/client';
import { ALL_Authors, ALL_Books } from './components/queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const authors = useQuery(ALL_Authors);
  const books = useQuery(ALL_Books);
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors authors={authors} show={page === 'authors'} />

      <Books books={books} show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;

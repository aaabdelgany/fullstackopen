import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import SetBirthYear from './components/SetBirthYear';
import Login from './components/Login';
import Recommended from './components/Recommended';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [error, setError] = useState('');
  const localToken = localStorage.getItem('login-user-token');
  const [token, setToken] = useState(localToken ? localToken : null);
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const Error = () => {
    if (!error) return null;
    return <div style={{ color: 'red' }}>{error}</div>;
  };
  const logout = () => {
    setToken(null);
    localStorage.clear();
  };
  const errorNotify = (err) => {
    setError(err);
    console.log(err);
    setTimeout(() => {
      setError(null);
    }, 10000);
  };
  return (
    <div>
      <div>
        <Error />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <button onClick={() => setPage('recommended')}>Recommended</button>
        ) : (
          <></>
        )}
        {token ? (
          <button onClick={() => setPage('add')}>add book</button>
        ) : (
          <></>
        )}
        {token ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <button onClick={() => setPage('login')}>Login</button>
        )}
      </div>

      <Authors authors={authors} show={page === 'authors'} />
      <SetBirthYear show={page === 'authors'} errorNotify={errorNotify} />
      <Books books={books} show={page === 'books'} />
      <NewBook show={page === 'add'} errorNotify={errorNotify} />
      <Login
        show={page === 'login'}
        errorNotify={errorNotify}
        setToken={setToken}
        setPage={setPage}
      />
      <Recommended show={page === 'recommended'} errorNotify={errorNotify} />
    </div>
  );
};

export default App;

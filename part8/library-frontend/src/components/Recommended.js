import React, { useState, useEffect } from 'react';
import { ME, ALL_BOOKS } from '../queries';
import { useLazyQuery, useQuery } from '@apollo/client';

const Recommended = ({ show, errorNotify }) => {
  const user = useQuery(ME);
  const [books, setBooks] = useState([]);
  const [me, setMe] = useState(null);
  const [allBooks, result] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (user.data) {
      setMe(user.data.me);
      //   console.log(me, user.data);
      allBooks({ variables: { genre: user.data.me.favoriteGenre } });
    }
  }, [user, me, allBooks]);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);
  //   useEffect(async () => {
  //     await allBooks({ variables: { genre: user.favoriteGenre } });
  //     setBooks(result.data);
  //   }, []);
  if (!show) {
    return null;
  }
  return (
    <div>
      <h2>Recommended books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const SetBirthYear = ({ show, errorNotify }) => {
  const [name, setName] = useState('');
  const [setBornTo, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      errorNotify(error.graphQLErrors[0].message);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, setBornTo } });

    setName('');
    setBorn('');
  };

  if (!show) {
    return null;
  }
  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Edit Author</button>
      </form>
    </div>
  );
};

export default SetBirthYear;

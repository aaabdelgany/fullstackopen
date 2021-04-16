import React from 'react';

const SearchFilter=({filter,func})=>{
    return (<div>filter shown with <input value={filter} onChange={func}/></div>)
  }
export default SearchFilter
import React from 'react';
const CoView=({co})=>{
  return (
    <>
    <h3>{co.name}</h3>
    <p>Capital {co.capital}</p>
    <p>Population {co.population}</p>
    <h3>Languages</h3>
    <ul>
      {co.languages.map(lang=><li key={co.alpha2Code.concat(lang.iso639_2)}>{lang.name}</li>)}
    </ul>
    <img src={co.flag} alt=''/>
    </>
  )
}

export default CoView
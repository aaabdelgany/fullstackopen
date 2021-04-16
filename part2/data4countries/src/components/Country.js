import React from 'react';
const Country=({co,func})=>{
    const showCountry=()=>{
      func(co.name);
    }
    return(
    <>
    <p>{co.name}</p><button onClick={showCountry}>show</button>
    </>
    )
  }
export default Country
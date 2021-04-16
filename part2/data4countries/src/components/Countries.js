import React from 'react';
import Country from './Country';
import Weather from './Weather';
import CoView from './CoView';
const Countries=({countries,func,weather})=>{
    //const filtCo=countries.filter(co=>co.name.toUpperCase().includes(filt.toUpperCase()))
    if(countries.length>10){
      return `Too many matches, specify another filter`;
    }else if(countries.length===1){
      const co=countries[0];
      if(weather===undefined){
        return (<CoView co={co}/>)
      }
      return (
        <>
      <CoView co={co}/>
      <Weather weather={weather}/> 
      </>
      )
    }
    return (countries.map(co=><Country func={func} key={co.alpha2Code} co={co}/>))
  }
export default Countries
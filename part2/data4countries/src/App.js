import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchFilter from './components/SearchFilter';
import Countries from './components/Countries';

const api_key = process.env.REACT_APP_API_KEY
function App() {
  const [countries,setCount]=useState([]);
  const [filt,setFilt]=useState('');
  const [weather,setWeather]=useState({});

  
  useEffect(()=>{
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(rep=>{
      const filtCount=rep.data.filter(co=>co.name.toUpperCase().includes(filt.toUpperCase()))
      setCount(filtCount);
    })
  },[filt])

  useEffect(()=>{
    if(countries.length===1 && Object.keys(weather).length===0){
      const capital=countries[0].capital
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(rep=>{
        setWeather(rep.data);
      })
    }else if(countries.length>1){
      setWeather({});
    }
    },[countries])

  const filtChange=(event)=>{
    setFilt(event.target.value);
  }
  return (
    <div>
    <SearchFilter filter={filt} func={filtChange}/>
    <Countries countries={countries} func={setFilt} weather={weather.current}/>
    </div>
  )
}

export default App;

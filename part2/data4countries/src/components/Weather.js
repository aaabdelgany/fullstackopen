import React from 'react';


const Weather=({weather})=>{
    return(
    <>
      <p>temperature: {weather.temperature} Celsius</p>
      <img src={weather.weather_icons[0]} alt=''/>
      <p>wind: {weather.wind_speed} direction {weather.wind_dir}</p>
    </>)
  }

  export default Weather
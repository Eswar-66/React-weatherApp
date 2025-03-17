import './Weather.css';
import searchicon from './image/search.png';
import clearsky from './image/clear-sky.png'
import weather from './image/weather.png'
import humidity from './image/Humidity.png'
import wind from './image/wind.png'
import lightrain from './image/light-rain.png'
import rain from './image/rain.png'
import raincloud from './image/rain-cloud.png'
import snow from './image/snow.png'
import thundertorm from './image/thunderstorm.png'
import mist from './image/mist.png'
import clear from './image/Clear.png'

import React, { useEffect, useState } from 'react'


const WeatherDetails =({icon ,temp ,city,country,humidityy, windss})=>{
  return(
    <>
      <div className='image'>
      <img src={icon} alt='clear sky'/>
      </div>
      <div className='temp'>{temp}°C</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      <div className='data-container'>
        <div className='humidity-data'>
          <img className='hum-icon' src={humidity} alt="humidity-imag"/>
          <div className='data-hum'>
            <div className='humidity-per'>{humidityy}%</div>
            <div className='hum-tex'>Humidity</div>
          </div>
        </div>

        <div className='wind-data'>
          <img className='win-icon' src={wind} alt="wind-imag"/>
          <div className='data-win'>
            <div className='win-per'>{windss} km/hr</div>
            <div className='wind-tex'>Wind</div>
          </div>
        </div>
       
      </div>
    </>
  
  )
}


export default function Weather() {
  const Api_key="1285ff59eb893eb5043e92e9fa2b9419";
  
  const[text,setText]=useState("Chennai")
  const [icon,setIcon]=useState(clearsky)
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("Chennai")
  const [country,setCountry]=useState("IN")
  const [humidit,setHumi]=useState(25)
  const [win,setWin]=useState(0)
  const[citynotFound,setCitynotfound]=useState(false)
  const[loading,setLoading]=useState(false)
  const[error,seterror]=useState(null)

  const weatherIconmap=
  {
    "01d":clear,
    "01n":clear,
    "02n":clearsky,
    "02d":clearsky,
    "03d":raincloud,
    "03n":raincloud,
    "04n":weather,
    "04d":weather,
    "09n":lightrain,
    "09d":lightrain,
    "10d":rain,
    "10n":rain,
    "11d":thundertorm,
    "11n":thundertorm,
    "13d":snow,
    "13n":snow,
    "50d":mist,
    "50n":mist
  }

  const search=async ()=>{
    setLoading(true);
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${Api_key}&units=Metric`

    try{
     let res=await fetch(url);
     let data= await res.json();
     if(data.cod === '404'){
      setCitynotfound(true);
      setLoading(false);
      return
     }

     setHumi(data.main.humidity);
     setWin(data.wind.speed)
     setTemp(Math.floor(data.main.temp))
     setCity(data.name)
     setCountry(data.sys.country)
     const weathericoncode=data.weather[0].icon
     setIcon(weatherIconmap[weathericoncode] || clearsky)
     setCitynotfound(false);

    }catch(error){
      console.error("AN error occured:",error.message)
      seterror("Error occured while fetch the data")
    }
    finally{
      setLoading(false)
    }
  }

  const handlecity=(e)=>{
      setText(e.target.value)
  }

  const handlekeydown=(e)=>{
    if(e.key === "Enter"){
      search();
    }
  }

  useEffect(function(){
    search(); 
  },[])

  return (
    <>
      <div className='container'>
        <div className='search'>
          <input type='text' value={text} placeholder='Enter the city name' onChange={handlecity} onKeyDown={handlekeydown}/>
          <div className='serach-icon' onClick={()=>search()}>
            <img className='img' src={searchicon}  alt='search icon' />
          </div>

        </div>

        {citynotFound && <div className='citynotfounderror'> City not found</div>}
        { loading && <div className='loading'>Loading...</div>}
        {error && <div className='error-msg'>{error}</div>}
       {!loading && !citynotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} humidityy={humidit} windss={win}/>}

      </div>
    </>
  )
}

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faWater, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import './WeatherApp.css';

const WeatherApp = () => {
    const [iconUrl, setIconUrl] = useState('https://openweathermap.org/img/wn/04d@4x.png`');
    const [city, setCity] = useState('London');

    let api_key = "913e3beb7b5950b2aeba64ff0d3270c6";

    const search = async () => {
        if(city === ''){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temprature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');

        if(data.main && data.main.humidity !== undefined && data.wind && data.wind.speed !== undefined) {
            humidity[0].innerHTML = data.main.humidity + " %";
            wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
            temprature[0].innerHTML = Math.floor(data.main.temp) + "°C";
            location[0].innerHTML = data.name;

            let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            setIconUrl(iconUrl);
        } else {
            console.log('Error!')
        }
    }
    useEffect(() => {search();}, [city]);

    return (
        <div className="container">
            <div className="top-bar">
                <input 
                    type="text" 
                    className="cityInput" 
                    placeholder="Search"
                    onChange={(e)=> setCity(e.target.value)}
                />
                <div className="search-icon">
                    <FontAwesomeIcon className="icon"icon={faMagnifyingGlass} alt="search" onClick={() => {search()}}/>
                </div>
            </div>
            
            <div className="weather-card">
                <div className="weather-image">
                    <img className="weather-status" src={iconUrl} alt="weather-status" />
                </div>
                <div className="weather-temp">24c</div>
                <div className="weather-location">{city}</div>
                <div className="data-container">
                    <div className="element">
                        <FontAwesomeIcon className="icon" icon={faWater}  />
                        <div className="data">
                            <div className="humidity-percent">56%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <FontAwesomeIcon className="icon" icon={faWind} />
                        <div className="data">
                            <div className="wind-rate">10 km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
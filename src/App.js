import React, { useState} from "react";
import axios from 'axios';


function App() {
	const [data, setData] =  useState({});
	const [location, setLocation] = useState('');
	const [error, setError] = useState(false);
	
	const api = '913e3beb7b5950b2aeba64ff0d3270c6';

	
	
	const searchLocation = async (event) => {
		if (event.key === 'Enter'){
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&&units=Metric&appid=${api}`;
			try{
				const response = await axios.get(url);
				setData(response.data);
				setError(false);
			} catch (error) {
				setError(true)
			}
			setLocation('');
		}
	}


	return (
		<div className="App">
			<div className="search">
				<input 
					value={location}
					onChange={event => setLocation(event.target.value)}
					onKeyPress={searchLocation}
					placeholder="Enter Location"
					type="text" 
				/>
			</div>
			<div className="container">
				{error && <p className="error-message active">City not found. Please enter a valid city.</p>}
				<div className="top">
					<div className="gen-info">
						<div className="location">
							{data.name ? <p>{data.name}</p> : <p>--</p>}
							{data.sys ? <p>{data?.sys?.country}</p> : <p> -- </p>}
							<img src={data.sys ? `https://flagsapi.com/${data?.sys?.country}/shiny/24.png` : "https://flagsapi.com/GB/shiny/24.png"} alt="country-flag" />
						</div>
						<div className="temp">
							{data.main ? <h1>{Math.floor(data.main.temp)}°C</h1> : <h1>--C</h1>}
						</div>
					</div>
					<div className="descr">
						<img src={data.weather ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : "https://openweathermap.org/img/wn/04d@2x.png"} alt="current-weather-icon" />
						{data.weather ? <p className="rotate">{data.weather[0].main}</p> : <p className="rotate">-- -- --</p>}
					</div>
				</div>
				<div className="bottom">
					<div className="feels info">
						{data.main ? <p className="bold">{Math.floor(data.main.feels_like)}°C</p> : <p className="bold"> -- </p>}
						<p>Feels Like</p>
					</div>
					<div className="humidity info">
						{data.main ?  <p className="bold">{data.main.humidity}%</p> : <p className="bold"> -- </p>}
						<p>Humidity</p>
					</div>
					<div className="wind info">
						{data.wind ?  <p className="bold">{data.wind.speed.toFixed(1)}m/s</p> : <p className="bold"> -- </p>}
						<p>Winds</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

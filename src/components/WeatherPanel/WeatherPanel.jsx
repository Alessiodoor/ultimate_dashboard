import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

function WeatherPanel (props) {
	const [displayInfo, setDisplayInfo] = useState(false);
	const [city, setCity] = useState("");
	const [weatherInfo, setWeatherInfo] = useState({
		temp: 0,
		description: "",
		imgURL: ""
	});

	function handleCity(event){
		setCity(event.target.value);
	}

	function getWaether(){
		const units = "metric";
		const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + process.env.REACT_APP_API_KEY_WEATHER + "&units=" + units;
	    fetch(url, {"method": "GET"})
	    .then(response => response.json())
	    .then(response => {
	    	if(response.cod !== "200"){
	    		setDisplayInfo(true);
				const icon = response.weather[0].icon;
				setWeatherInfo({
					temp: Math.trunc(response.main.temp),
					description: response.weather[0].description,
					imgURL: " http://openweathermap.org/img/wn/" + icon + "@2x.png"
				});
	    	}else{
	    		console.log(response.message);
	    	}
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	return (
		<div className={props.size}>
			<div className="box search_weather_box">
				<input onChange={handleCity} value={city} className="weather_input" type="text" placeholder="Londra" />
				<Button className="search_weather_btn" onClick={getWaether} variant="contained" color="primary">
			        Cerca
			    </Button>
			</div>
			<Grow in={displayInfo}>
				<div className="box" style={{display: displayInfo? 'block': 'none'}}>
					<div className="weather_img">
						<img src={weatherInfo.imgURL} />
					</div>
					<div className="row">
						<p className="weather_temp col-sm-6">{weatherInfo.temp}&deg;</p>
						<div className="col-sm-6 weather_box">
							<p>Details</p>
							<p className="weather_details">{weatherInfo.description}</p>
						</div>
					</div>
				</div>
			</Grow>
		</div>
		);
}

export default WeatherPanel;
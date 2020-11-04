import React, {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Alert from '@material-ui/lab/Alert';

function WeatherPanel (props) {
	// informaizoni sulla città cercata
	const [displayInfo, setDisplayInfo] = useState(false);
	const [city, setCity] = useState("");
	const [weatherInfo, setWeatherInfo] = useState({
		temp: 0,
		description: "",
		imgURL: ""
	});
	const [searchErr, setSearchErr] = useState(false);

	// infomazioni meteo sulla città dell'utente
	const [userCityInfo, setUserCityInfo] = useState({
		temp: 0,
		description: "",
		imgURL: ""
	});

	function handleCity(event){
		setCity(event.target.value);
	}

	function getWaetherUserCity(){
		getWaether(props.user.city, true);
	}

	function getWaetherSearchCity(){
		getWaether(city, false)
	}

	function getWaether(query, isUser){
		const units = "metric";
		const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + process.env.REACT_APP_API_KEY_WEATHER + "&units=" + units;
	    fetch(url, {"method": "GET"})
	    .then(response => response.json())
	    .then(response => {
	    	if(response.cod !== "200"){
	    		setSearchErr(false);
	    		if(!isUser){
		    		setDisplayInfo(true);
		    	}
				const icon = response.weather[0].icon;
				const newInfo = {
					temp: Math.trunc(response.main.temp),
					description: response.weather[0].description,
					imgURL: " http://openweathermap.org/img/wn/" + icon + "@2x.png"
				};
				if(isUser){
					setUserCityInfo(newInfo);
				}else {
					setWeatherInfo(newInfo);
				}

	    	}else{
	    		console.log(response.message);
	    	}
	    })
	    .catch(err => { 
	    	console.log(err); 
	    	setSearchErr(true);
		    setDisplayInfo(false);
	    });
	}

	useEffect(() => {getWaetherUserCity(); }, [props.user.city]);

	return (
		<div className={props.size}>
			<div>
				<div className="box">
					<p className="userCity_name">Meteo {props.user.city}</p>
					<div className="weather_img">
						<img src={userCityInfo.imgURL} alt="weather_icon" />
					</div>
					<div className="row">
						<p className="weather_temp col-sm-6">{userCityInfo.temp}&deg;</p>
						<div className="col-sm-6 weather_box">
							<p>Details</p>
							<p className="weather_details">{userCityInfo.description}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="box search_weather_box">
				<p>Cerca il meteo di una città</p>
				<input onChange={handleCity} value={city} className="weather_input" type="text" placeholder="Londra" />
				<Button className="search_weather_btn" onClick={getWaetherSearchCity} variant="contained" color="primary">
			        Cerca
			    </Button>
			    {searchErr && <Alert severity="error">Città non trovata</Alert>}
			</div>
			<div>
				<div className="box" style={{display: displayInfo? 'block': 'none'}}>
					<div className="weather_img">
						<img src={weatherInfo.imgURL} alt="weather_icon" />
					</div>
					<div className="row">
						<p className="weather_temp col-sm-6">{weatherInfo.temp}&deg;</p>
						<div className="col-sm-6 weather_box">
							<p>Details</p>
							<p className="weather_details">{weatherInfo.description}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
}

export default WeatherPanel;
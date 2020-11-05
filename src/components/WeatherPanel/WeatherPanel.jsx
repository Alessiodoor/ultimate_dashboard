import React, {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CityInfo from "./CityInfo";

function WeatherPanel (props) {
	// informaizoni sulla città cercata
	const [displayInfo, setDisplayInfo] = useState(false);
	const [city, setCity] = useState("");
	const [weatherInfo, setWeatherInfo] = useState({
		temp: 0,
		feels: 0,
		description: "",
		imgURL: "",
		city: "",
		country: ""
	});
	const [searchErr, setSearchErr] = useState(false);

	// infomazioni meteo sulla città dell'utente
	const [userCityInfo, setUserCityInfo] = useState({
		temp: 0,
		feels: 0,
		description: "",
		imgURL: "",
		city: "",
		country: ""
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
		    	
				const newInfo = {
					temp: Math.trunc(response.main.temp),
					feels: Math.trunc(response.main.feels_like),
					description: response.weather[0].description,
					imgURL: " http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png",
					city: query,
					country: response.sys.country
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
				<CityInfo weatherInfo={userCityInfo} />
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
				{displayInfo && <CityInfo weatherInfo={weatherInfo} />}
			</div>
		</div>
		);
}

export default WeatherPanel;
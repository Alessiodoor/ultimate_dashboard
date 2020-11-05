import React from "react";

function CityInfo (props) {
	return(
			<div className="box">
				<p className="userCity_name">{props.weatherInfo.city}, {props.weatherInfo.country}</p>
				<div className="weather_img">
					<img src={props.weatherInfo.imgURL} alt="weather_icon" />
				</div>
				<div className="row">
					<div className="col-sm-7 weather_box text-justify">
						<p className="weather_temp">{props.weatherInfo.temp}&deg;C</p>
						<p>Percepiti {props.weatherInfo.feels}&deg;C</p>
					</div>
					<div className="col-sm-5 weather_box">
						<p style={{"marginTop": "15%"}}>Details</p>
						<p className="weather_details">{props.weatherInfo.description}</p>
					</div>
				</div>
			</div>
		);
}

export default CityInfo;
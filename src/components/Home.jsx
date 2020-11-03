import React, {useState, useEffect} from "react";
import TodoList from "./TodoList/TodoList";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import Welcome from "./Welcome";

function Home (props) {
	const size = "col-sm-4";

	return (
		<div>
			{sessionStorage.getItem('userId') 
				? 
				<div className="row navbar-container">
					<TodoList size={size} />
					<WeatherPanel size={size} />
				</div> 
				:
				<Welcome />
			}
		</div>
		);
}

export default Home;
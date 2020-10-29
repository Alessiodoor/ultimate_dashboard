import React, {useState} from "react";
import TodoList from "./TodoList/TodoList";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import Welcome from "./Welcome";

function Home () {
	const size = "col-sm-4";
	const [logged, setLogged]= useState(true);

	return (
		<div>
		{logged ? 
		<div className="row navbar-container">
			<TodoList size={size} />
			<WeatherPanel size={size} />
		</div> 
		:
		<Welcome />}
		</div>
		);
}

export default Home;
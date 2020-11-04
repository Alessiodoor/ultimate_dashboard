import React from "react";
import TodoList from "./TodoList/TodoList";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import Welcome from "./Welcome";

function Home (props) {
	const size = "col-sm-4";

	return (
		<div>
			{props.user.logged
				? 
				<div className="row navbar-container">
					<TodoList size={size} />
					<WeatherPanel size={size} user={props.user} />
				</div> 
				:
				<Welcome />
			}
		</div>
		);
}

export default Home;
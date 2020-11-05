import React from "react";
import TodoList from "./TodoList/TodoList";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import Welcome from "./Welcome";
import SideMenu from "./Partials/SideMenu";

function Home (props) {
	const size = "col-sm-4";

	return (
		<div>
			<div id="outer-container">
	      	    {props.user.logged && <SideMenu />}
		      	<main id="page-wrap">
				{props.user.logged
					? 
					<div className="row navbar-container">
						<TodoList size={size} />
						<WeatherPanel size={size} user={props.user} />
					</div> 
					:
					<Welcome />
				}
				</main>
			</div>
		</div>
		);
}

export default Home;
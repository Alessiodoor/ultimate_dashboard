import React, {useState, useEffect} from "react";
import TodoList from "./TodoList/TodoList";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import Welcome from "./Welcome";

function Home () {
	const size = "col-sm-4";
	const [logged, setLogged]= useState(true);

	function checkLogin () {
		fetch("http://localhost:5000/isAuthenticated", {"method": "GET"})
	    .then(response => response.json())
	    .then(response => {
	    	console.log(response);
	    	setLogged(response.code === 1);
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	useEffect(() => {checkLogin(); }, []);

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
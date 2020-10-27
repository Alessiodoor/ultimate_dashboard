import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import TodoList from "./TodoList/TodoList";
import WeatherPanel from "./WeatherPanel/WeatherPanel";

// nb: deve essere tutto compreso in un div se no errore
function App(){
	const size = "col-sm-4"
	return (
		<div>
			<Header />
			<div className="row navbar-container">
				<TodoList size={size} />
				<WeatherPanel size={size} />
			</div>
			<Footer />
		</div>
		);
}

export default App;
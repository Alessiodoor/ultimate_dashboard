import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import TodoList from "./TodoList";

// nb: deve essere tutto compreso in un div se no errore

function App(){
	return (
		<div>
			<Header />
			<TodoList listName="Today"/>
			<Footer />
		</div>
		);
}

export default App;
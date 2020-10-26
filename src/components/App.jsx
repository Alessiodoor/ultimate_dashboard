import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import List from "./List";
import Lists from "./Lists";

// nb: deve essere tutto compreso in un div se no errore

function App(){
	return (
		<div>
			<Header />
			<List />
			<Lists />
			<Footer />
		</div>
		);
}

export default App;
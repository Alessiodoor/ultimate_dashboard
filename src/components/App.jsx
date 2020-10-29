import React from "react";
import Header from "./Partials/Header";
import Footer from "./Partials/Footer";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Login from "./User/Login";
import Registration from "./User/Registration";
// nb: deve essere tutto compreso in un div se no errore
function App(){
	return (
			<div>
				<Router>
					<div>
					<Header />
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/registration" component={Registration} />
					</div>	
				</Router>
				<Footer />
			</div>
		);
}

export default App;
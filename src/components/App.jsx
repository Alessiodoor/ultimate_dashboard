import React, {useState, useEffect} from "react";
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
	const [logged, setLogged] = useState(sessionStorage.getItem('userId'));

	function handleLogged () {
		console.log(logged);
		if(sessionStorage.getItem('userId')){
			setLogged(true);
		}else{
			setLogged(false);
		}
	}

	useEffect(() => {handleLogged(); }, [sessionStorage.getItem('userId')]);

	return (
			<div>
				<Router>
					<div>
					<Header logged={logged} />
						<Route 
							exact path="/" 
							render={(props) => (
    							<Home {...props} />
  							)} 
  						/>
						<Route 
							path="/login" 
							render={(props) => (
    							<Login {...props} />
  							)}  
						/>
						<Route path="/registration" component={Registration} />
					</div>	
				</Router>
				<Footer />
			</div>
		);
}

export default App;
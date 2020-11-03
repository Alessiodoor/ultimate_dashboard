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
	console.log(sessionStorage.getItem('userId'));
	const [user, setUser] = useState({
		username: "",
		name: "",
		surname: "",
		gender: "",
		city: ""
	});

	//sessionStorage.getItem('userId')

	function getUser (id) {
		fetch("http://localhost:5000/user", {
	      "method": "POST",
	      headers: {
	        'Accept': 'application/json',
        	'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({userId: id})
	    })
	    .then(response => response.json())
	    .then(response => {
	    	if(response.err === null){
	    		console.log(response);
	    	}else{
	    		console.log(response.err);
	    	}
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	function handleLogged () {
		if(sessionStorage.getItem('userId')){
			getUser(sessionStorage.getItem('userId'));
		}else{
			console.log('Not logged');
		}
	}

	useEffect(() => {handleLogged(); }, [sessionStorage.getItem('userId')]);

	return (
			<div>
				<Router>
					<div>
					<Header user={user} />
						<Route 
							exact path="/" 
							render={(props) => (
    							<Home {...props} user={user}/>
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
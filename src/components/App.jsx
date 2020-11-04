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
	const [user, setUser] = useState({
		username: "",
		name: "",
		surname: "",
		gender: "",
		city: "",
		logged: false
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
	    		setUser({
	    			...response.user,
	    			logged: true
	    		});
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

	function logout () {
		// Remove saved data from sessionStorage
		sessionStorage.removeItem('key');

		// Remove all saved data from sessionStorage
		sessionStorage.clear();

		// remove the user state
		setUser({
			username: "",
			name: "",
			surname: "",
			gender: "",
			city: "",
			logged: false
		});
	}
	
	const userId = sessionStorage.getItem('userId');
	useEffect(() => {handleLogged(); }, [userId]);

	return (
			<div>
				<Router>
					<div>
					<Header user={user}  onLogout={logout} />
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
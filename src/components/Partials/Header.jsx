import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
	function logout () {
		// Remove saved data from sessionStorage
		sessionStorage.removeItem('key');

		// Remove all saved data from sessionStorage
		sessionStorage.clear();

		props.history.push('/');
	}

	return (
		<header>
			<div className="navbar-container d-flex flex-column flex-md-row align-items-center bg-white border-bottom box-shadow">
			  	<Link className="my-0 mr-md-auto" to="/"><h5 className="font-weight-bold">Dashboard.</h5></Link>
			  	<nav className="my-2 my-md-0 mr-md-3">
			    	<a className="p-2 text-dark" href="index.html">Meteo</a>
			  	</nav>
			  	{props.logged 
			  		?
			  		<div style={{"width": "18%"}}>
			  			<button className="btn btn-outline-dark navbar-btn" onClick={logout}>Logout</button>
			  		</div>
			  		:
			  		<div style={{"width": "18%"}}>
			  			<Link className="btn btn-outline-primary navbar-btn" to="/login">Sign in</Link>
			  			<Link className="btn btn-outline-dark navbar-btn" to="/registration">Sign up</Link>
			  		</div>
			  	}
			</div>
		</header>
		);
}

export default Header;
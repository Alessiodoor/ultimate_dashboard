import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header>
			<div className="navbar-container d-flex flex-column flex-md-row align-items-center bg-white border-bottom box-shadow">
			  	<Link className="my-0 mr-md-auto" to="/"><h5 className="font-weight-bold">Dashboard.</h5></Link>
			  	<nav className="my-2 my-md-0 mr-md-3">
			    	<a className="p-2 text-dark" href="index.html">Meteo</a>
			  	</nav>
			  	<Link className="btn btn-outline-primary navbar-btn" to="/login">Sign in</Link>
			  	<Link className="btn btn-outline-dark navbar-btn" to="/registration">Sign up</Link>
			</div>
		</header>
		);
}

export default Header;
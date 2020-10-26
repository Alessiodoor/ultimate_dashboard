import React from "react";

function Header() {
	return (
		<header>
			<div className="navbar-container d-flex flex-column flex-md-row align-items-center bg-white border-bottom box-shadow">
			  	<a className="my-0 mr-md-auto" href="/"><h5 className="font-weight-bold">Dashboard.</h5></a>
			  	<nav className="my-2 my-md-0 mr-md-3">
			    	<a className="p-2 text-dark" href="index.html">Meteo</a>
			  	</nav>
			  	<a className="btn btn-outline-primary navbar-btn" href="/login">Sign in</a>
			  	<a className="btn btn-outline-dark navbar-btn" href="/register">Sign up</a>
			</div>
		</header>
		);
}

export default Header;
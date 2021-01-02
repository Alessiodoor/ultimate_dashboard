import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function Header(props) {
	const useStyles = makeStyles((theme) => ({
	  root: {
	    flexGrow: 1,
	  },
	  menuButton: {
	    marginRight: theme.spacing(2),
	  },
	  title: {
	    flexGrow: 1,
	  },
	}));

	const classes = useStyles();

	return (
		<div className={classes.root}>
	      <AppBar position="static">
	        <Toolbar>
	          	<Typography variant="h6" className={classes.title}>
	            	<Link to="/">Dashboard.</Link>
	          	</Typography>
	          	{props.user.logged ? (
	            <div>
	            	<Button color="inherit">{props.user.username}</Button>
	      			<Button color="inherit" onClick={function() {
			  				props.onLogout();
			  			}}>Logout</Button>
	            </div>
	          ):
	          	<div>
	      			<Button color="inherit"><Link to="/login">Sign in</Link></Button>
	      			<Button color="inherit"><Link to="/registration">Sign up</Link></Button>
	      		</div>}
	        </Toolbar>
	      </AppBar>
	    </div>
		);
}

export default Header;

/*
		<header>
			<div className="navbar-container d-flex flex-column flex-md-row align-items-center bg-white border-bottom box-shadow">
			  	<Link className="my-0 mr-md-auto" to="/"><h5 className="font-weight-bold">Dashboard.</h5></Link>
			  	<nav className="my-2 my-md-0 mr-md-3">
			    	<a className="p-2 text-dark" href="index.html">Meteo</a>
			  	</nav>
			  	{props.user.logged 
			  		?
			  		<div style={{"width": "18%"}}>
			  			<button className="btn btn-outline-dark navbar-btn" onClick={function() {
			  				props.onLogout();
			  			}}>Logout</button>
			  		</div>
			  		:
			  		<div style={{"width": "18%"}}>
			  			<Link className="btn btn-outline-primary navbar-btn" to="/login">Sign in</Link>
			  			<Link className="btn btn-outline-dark navbar-btn" to="/registration">Sign up</Link>
			  		</div>
			  	}
			</div>
		</header>
*/
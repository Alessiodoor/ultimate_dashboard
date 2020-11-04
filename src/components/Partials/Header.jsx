import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
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
  	const [anchorEl, setAnchorEl] = React.useState(null);
  	const open = Boolean(anchorEl);

  	const handleMenu = (event) => {
    	setAnchorEl(event.currentTarget);
  	};

  	const handleClose = () => {
    	setAnchorEl(null);
  	};

	return (
		<div className={classes.root}>
	      <AppBar position="static">
	        <Toolbar>
	          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
	            <MenuIcon />
	          </IconButton>
	          <Typography variant="h6" className={classes.title}>
	            <Link to="/">Dashboard.</Link>
	          </Typography>
	          {props.user.logged ? (
	            <div>
	              <IconButton
	                aria-label="account of current user"
	                aria-controls="menu-appbar"
	                aria-haspopup="true"
	                onClick={handleMenu}
	                color="inherit"
	              >
	                <AccountCircle />
	              </IconButton>

	              <Menu
	                id="menu-appbar"
	                anchorEl={anchorEl}
	                anchorOrigin={{
	                  vertical: 'top',
	                  horizontal: 'right',
	                }}
	                keepMounted
	                transformOrigin={{
	                  vertical: 'top',
	                  horizontal: 'right',
	                }}
	                open={open}
	                onClose={handleClose}
	              >
	                <MenuItem onClick={handleClose}>Profile</MenuItem>
	                <MenuItem onClick={function() {
			  				props.onLogout();
			  			}}>Logout</MenuItem>
	              </Menu>
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
import React, {useState} from "react";
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

function Login (props) {
	const [user, setUser] = useState({
		username: "",
		password: ""
	});

	const [loginErr, setLoginErr] = useState(false);

	function handleUser (event) {
		const {name, value} = event.target;
		setUser(function(prevUser) {
			return {
				...prevUser,
				[name]: value
			}
		});
	}

	/*
	function isLogged () {
		fetch("http://localhost:5000/isAuthenticated", {"method": "GET"})
	    .then(response => response.json())
	    .then(response => {
	    	console.log(response);
	    })
	    .catch(err => { console.log(err); 
	    });
	}*/

	function login(event){
		fetch("http://localhost:5000/login", {
	      "method": "POST",
	      headers: {
	        'Accept': 'application/json',
        	'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(user)
	    })
	    .then(response => response.json())
	    .then(response => {
	    	if(response.err === null){
	    		setLoginErr(false);
	    		sessionStorage.setItem('userId', response.user._id);
	    		props.history.push('/');
	    	}else{
	    		console.log(response.err);
	    		setLoginErr(true);
	    	}
	    })
	    .catch(err => { 
	    	console.log(err); 
	    	setLoginErr(true);
	    });

	    event.preventDefault();
	}

	return (
		<div className="container mt-5">
		  <h1>Login</h1>

		  <div className="row">
		    <div className="col-sm-8">
		      <div className="card">
		        <div className="card-body">
		          <form>
		            <div className="form-group">
		            	{loginErr && <Alert severity="error">Username o password errati</Alert>}
		              	<label htmlFor="email">Email</label>
		              	<TextField variant="outlined" onChange={handleUser} type="text" className="form-element" value={user.email}  name="username"/>
		            </div>
		            <div className="form-group">
		              	<label htmlFor="password">Password</label>
		              	<TextField variant="outlined" onChange={handleUser} type="password" className="form-element" value={user.password} name="password" />
		            </div>
		            <button onClick={login} className="btn btn-dark">Login</button>
		          </form>
		        </div>
		      </div>
		    </div>

		    <div className="col-sm-4">
		      <div className="card">
		        <div className="card-body">
		          <a className="btn btn-block" href="/auth/google" role="button">
		            <i className="fab fa-google"></i>&ensp;
		            Sign In with Google
		          </a>
		        </div>
		      </div>
		    </div> 

		  </div>
		</div>
);
}

export default Login;
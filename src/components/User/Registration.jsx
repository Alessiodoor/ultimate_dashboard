import React, {useState} from "react";
import Card from "./Card";
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

function Registration (props) {
	const [user, setUser] = useState({
		username: "",
		password: "",
		fName: "",
		lName: "",
		gender: "",
		city: ""
	});

	const [err, setErr] = useState({
		regErr: false,
		message: ""
	})

	function handleUser (event) {
		const {name, value} = event.target;
		setUser(function(prevUser) {
			return {
				...prevUser,
				[name]: value
			}
		});
	}

	function registerNewUser (event) {
		fetch("http://localhost:5000/register", {
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
	    		setErr({regErr: false, message: ""});
	    		props.history.push('/login');
	    	}else{
	    		setErr({regErr: true, message: response.err.message});
	    	}
	    })
	    .catch(err => { 
	    	console.log(err); 
	    });

	    event.preventDefault();
	}

	return (
		<div className="container mt-5">
		  <h1>Register</h1>

		  <div className="row">
		    <div className="col-sm-8" style={{"marginBottom": "3%"}}>
		      <div className="card">
		        <div className="card-body">
		          <form>
		          	{err.regErr && <Alert severity="error">{err.message}</Alert>}
		            <div className="form-group">
		              <TextField label="Email" variant="outlined" onChange={handleUser} type="text" className="form-element" name="username" value={user.username} />
		            </div>
		            <div className="form-group">
					    <FormLabel component="legend">Gender</FormLabel>
					      <RadioGroup aria-label="gender" name="gender" value={user.gender} onChange={handleUser} row>
					        <FormControlLabel value="female" control={<Radio color='primary' />} label="Female" />
					        <FormControlLabel value="male" control={<Radio color='primary' />} label="Male" />
					        <FormControlLabel value="other" control={<Radio color='primary' />} label="Other" />
					      </RadioGroup>
		            </div>
		            <div className="form-group">
		              <TextField label="Name" variant="outlined" onChange={handleUser} type="text" className="form-element" name="fName" value={user.fName} />
		            </div>
		            <div className="form-group">
		              <TextField label="Surname" variant="outlined" onChange={handleUser} type="text" className="form-element" name="lName" value={user.lName} />
		            </div>
		            <div className="form-group">
		              <TextField label="City" variant="outlined" onChange={handleUser} type="text" className="form-element" name="city" value={user.city} />
		            </div>
		            <div className="form-group">
		              <TextField label="Password" variant="outlined" onChange={handleUser} type="password" className="form-element" name="password" value={user.password} />
		            </div>
		            <button onClick={registerNewUser} className="btn btn-dark">Register</button>
		          </form>

		        </div>
		      </div>
		    </div>

		    <Card user={user}/>

		    <div className="col-sm-4">
		      <div className="card social-block">
		        <div className="card-body">
		          <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
		            <i className="fab fa-google"></i>
		            Sign Up with Google
		          </a>
		        </div>
		      </div>
		    </div>

		  </div>
		</div>
);
}

export default Registration;
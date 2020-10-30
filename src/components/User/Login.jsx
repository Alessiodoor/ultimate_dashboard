import React, {useState} from "react";

function Login (props) {
	const [user, setUser] = useState({
		username: "",
		password: ""
	});

	function handleUser (event) {
		const {name, value} = event.target;
		setUser(function(prevUser) {
			return {
				...prevUser,
				[name]: value
			}
		});
	}

	function isLogged () {
		fetch("http://localhost:5000/isAuthenticated", {"method": "GET"})
	    .then(response => response.json())
	    .then(response => {
	    	console.log(response);
	    })
	    .catch(err => { console.log(err); 
	    });
	}

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
	    	console.log(response);
	    	console.log(localStorage.getItem('cookie'));
	    	if(response.err === null){
	    		//props.history.push('/');
	    		//isLogged();
	    	}else{
	    		console.log(response.err);
	    	}
	    })
	    .catch(err => { console.log(err); 
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
		              <label htmlFor="email">Email</label>
		              <input onChange={handleUser} type="text" className="form-control" value={user.email}  name="username"/>
		            </div>
		            <div className="form-group">
		              <label htmlFor="password">Password</label>
		              <input onChange={handleUser} type="password" className="form-control" value={user.password} name="password"/>
		            </div>
		            <button onClick={login} className="btn btn-dark">Login</button>
		          </form>
		          <button onClick={isLogged}>Check</button>
		        </div>
		      </div>
		    </div>

		    <div className="col-sm-4">
		      <div className="card">
		        <div className="card-body">
		          <a className="btn btn-block" href="/auth/google" role="button">
		            <i className="fab fa-google"></i>
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
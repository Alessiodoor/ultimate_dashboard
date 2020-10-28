require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

//local requires
const TodoList = require(__dirname + "/todolist.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// per ogni tipo di autenticazione, anche non locale
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// per poter fare richieste api da react
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// Connection to DB, localhost, named ultimatedashboardDB
const local_url = "mongodb://localhost:27017/ultimatedashboardDB";
mongoose.connect(local_url, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

let todoList = new TodoList(mongoose);

const userSchema = new mongoose.Schema ({
	email: String,
	password: String,
	googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

// Initialize google login API
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

// api per tutte le liste
app.route("/lists")
	.get(function(req, res) {
		// ottengo tutte le liste di un utente
		todoList.getLists(function(result) {
			res.send(result);
		});
	})
	.post(function(req, res) {
		// aggiungo una lista
		console.log(req.body);
		todoList.createNewList(req.body.listName, function(result) {
			res.send(result);
		});
	})
	.delete(function(req, res) {
		// rimuovo una lista tramite id
		todoList.deleteList(req.body.listId, function(result) {
			res.send(result);
		})
	});

// api per la singola lista, l'item lo passo come parametro del body
app.get("/lists/:listId", function(req, res) {
	// get items in a list
	todoList.getList(req.params.listId, function(result) {
		res.send(result);
	});
});

app.put("/lists/:listId/:itemName", function(req, res) {
	// add an item to the list
	todoList.insertNewItem(req.params.itemName, req.params.listId, function(result) {
		res.send(result);
	});
});

app.delete("/lists/:listId/:itemId", function(req, res) {
	// delete item from the list by id
	todoList.deleteItem(req.params.listId, req.params.itemId, function(result) {
		res.send(result);
	});
});

// User APIs

// Create new user, the credentials are given by a form submition
app.post("/register", function(req, res) {
	User.register({username: req.body.username}, req.body.password, function(err, user) {
		if(err){
			res.send({err: err, message: "err"});
		}else{
			passport.authenticate("local")(req, res, function() {
				res.send({err: null, message: "Registered"});
			});
		}
	});
});

// Login a user, the credentials are given by a form submition
app.post("/login", function(req, res) {
	const newUser = new User ({
		username: req.body.username,
		password: req.body.password
	});

	req.login(newUser, function(err) {
		if(err){
			res.send({err: err, message: "Error"});
		}else {
			// atutentico l'utente con una strategia local, quando ho user sul db
			passport.authenticate("local")(req, res, function() {
				res.send({err: null, message: "Logged in"})
			});
		}
	});
});

app.get("/isAuthenticated", function(req, res) {
	if(req.isAuthenticated()){
		res.send({code: 1, message: "User authenticated"});
	}else{
		res.send({code: 0, message: "User not authenticated"});
	}
});

// Logout the user
app.get("/logout", function(req, res) {
	req.logout();
  	res.send({err: null, message: "Successfully logged out"})
});

app.listen(port, function(){
	console.log('Listening on port ' + port);
});
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//local requires
const TodoList = require(__dirname + "/todolist.js");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connection to DB, localhost, named dashboardDB
const local_url = "mongodb://localhost:27017/ultimatedashboardDB";
mongoose.connect(local_url, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

let todoList = new TodoList(mongoose);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

// api per tutte le liste
app.route("/lists")
	.get(function(req, res) {
		// ottengo tutte le liste di un utente
		var lists = [];
		todoList.getLists(function(result) {
				lists = result;	
		});
		res.send({lists: lists});
	})
	.post(function(req, res) {
		// aggiungo una lista
	})
	.delete(function(req, res) {
		// rimuovo una lista tramite id
	});

// api per la singola lista, l'item lo passo come parametro del body
app.route("/lists/:listName")
	.get(function(req, res) {
		// get items in a list
	})
	.put(function(req, res) {
		// add ain item to the list
	})
	.delete(function(req, res) {
		// delete item from the list by id
	})

app.listen(port, function(){
	console.log('Listening on port ' + port);
});
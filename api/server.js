const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//local requires
const TodoList = require(__dirname + "/todolist.js");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// per poter fare richieste api da react
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connection to DB, localhost, named ultimatedashboardDB
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
		todoList.getLists(function(result) {
			res.send(result);
		});
	})
	.post(function(req, res) {
		// aggiungo una lista
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
app.route("/lists/:listId")
	.get(function(req, res) {
		// get items in a list
		todoList.getList(req.params.listId, function(result) {
			res.send(result);
		})
	})
	.put(function(req, res) {
		// add an item to the list
		todoList.insertNewItem(req.body.itemName, req.params.listId, function(result) {
			res.send(result);
		})
	})
	.delete(function(req, res) {
		// delete item from the list by id
		todoList.deleteItem(req.params.listId, req.body.itemName, function(result) {
			res.send(result);
		});
	});

app.listen(port, function(){
	console.log('Listening on port ' + port);
});
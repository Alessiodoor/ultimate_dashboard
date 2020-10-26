const _ = require("lodash");

class TodoList {
	constructor(mongoose){
		this.itemSchema = new mongoose.Schema({
			name: {
				type: String,
				required: [true, "Specifie a name"]
			}
		});

		this.listSchema = new mongoose.Schema ({
			name: {
				type: String,
				require: true
			},
			items: [this.itemSchema]
		});

		this.Item = new mongoose.model("Item", this.itemSchema);
		this.List = new mongoose.model("List", this.listSchema);

		this.createDefaults();
	}

	createDefaults(){
		// Create default items
		const item1 = new this.Item ({
		name: "Cosa1"
		});
		const item2 = new this.Item ({
		name: "Cosa2"
		});
		const item3 = new this.Item ({
		name: "Cosa3"
		});

		this.defaultItems = [item1, item2, item3];
	}

	// Create schemas
	getItemSchema(){
		return this.itemSchema;
	}

	getListSchema(){
		return this.listSchema;
	}

	getList(){
		return this.List;
	}

	getItem(){
		return this.Item;
	}

	getLists(fn){
		this.List.find({}, function(err, results) {
			if(!err){
				fn({lists: results, err: null});
			}else{
				fn({lists: [], err: err});
			}	
		});
	}

	getList(listId, fn){

		this.List.findOne({_id: listId}, function(err, doc) {
			fn({err: err, list: doc});
		});
	}

	deleteItem(listId, itemName, fn){
		this.List.findOneAndUpdate({_id: listId}, {$pull: {items: {name: itemName}}}, function(err, doc) {
			if(err){
				fn({err: err, message: "Error"});		
			}else{
				fn({err: null, message: "Remove correctly"});
			}
		});
	}

	insertDefaultData(res, fn){
		const todayList = new this.List({
			name: "Today",
			items: this.defaultItems
		});

		todayList.save(function(err) {
			fn(err);
		});
	}

	insertNewItem(itemName, listId, fn){
		const item = new this.Item({
			name: itemName
		});

		// cerco la lista custom e ci aggiungo l'item
		this.List.findOne({_id: listId}, function(err, doc) {
			var saved;
			if(!err){
				doc.items.push(item);
				doc.save(function() {
					fn({err: null, message: "Item added"});
				});
			}else{
				fn({err: err, message: "Error"});
			}
			
		});
	}

	createNewList(listName, fn){
		listName = _.capitalize(listName);
		listName = _.replace(listName, ' ', '_');

		const newList = new this.List({
			name: listName,
			items: this.defaultItems
		});

		this.List.findOne({name: listName}, function(err, resultList) {
			if(err){
				// callback(err, listName)
				fn({
					err: err,
					messagge: "List not created"
				});
			}else {
				if(!resultList){
					newList.save(function() {
						// callback(err, listName)
						fn({
							err: null,
							messagge: "List created"
						});
					});
				}else{
					// callback(err, listName)
					fn({
						err: null,
						messagge: "List already exist"
					});
				}
			}
		});
	}

	deleteList(listId, fn) {
		this.List.deleteOne({_id: listId} , function(err, result) {
			if(err){
				fn({err: err, message: "Error"});
			}else {
				fn({err: null, message: "List deleted"});
			}
		});
	}
}

//const todoList = new TodoList();
module.exports = TodoList;
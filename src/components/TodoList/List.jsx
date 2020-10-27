import React, {useState, useEffect} from "react";
import Item from "./Item";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

function List (props){
	const [list, setList] = useState({
		name: "",
		items: [],
		id: 0
	});
	const [newItem, setNewItem] = useState("");

	function getList(){
	    fetch("http://localhost:5000/lists/" + props.listId, {"method": "GET"})
	    .then(response => response.json())
	    .then(response => {
	    	setList(response.list);
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	function deleteItem(itemId) {
		fetch("http://localhost:5000/lists/" + props.listId + "/" + itemId, {"method": "DELETE"})
	    .then(response => response.json())
	    .then(response => {
	    	console.log(response);
	    	if(response.err !== 'null'){
	    		getList();
	    	}
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	function putItem() {
		fetch("http://localhost:5000/lists/" + props.listId + "/" + newItem, {"method": "PUT"})
	    .then(response => response.json())
	    .then(response => {
	    	setList(response.list);
	    	// svuoto input text
	    	setNewItem("");
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	function handleNewItemInput(event){
		setNewItem(event.target.value);
	}

	// Estraggo lista ogni volta che listId viene aggiornato
	useEffect(() => {getList()}, [props.listId]);

	return (
		<div>
			<div className="box">
				<div className="box" id="heading">
					<h1 className="listTitle">{list.name}</h1>
				</div>
				<ul>
					{list.items.map(function(item) {
						return (
							<Item key={item._id} onDelete={deleteItem} id={item._id} list={list.name} name={item.name} />
							);	
					})}
				</ul>
				<div className="item ml-0">
					<input className="todolist_input" onChange={handleNewItemInput} value={newItem} type="text" placeholder="Cosa devi fare" />
					<Fab onClick={putItem}>
					    <AddIcon />
					</Fab>
				</div>
			</div>
		</div>
		);
}

export default List;
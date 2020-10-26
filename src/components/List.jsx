import React, {useState, useEffect} from "react";
import Item from "./Item";

function List (props){
	const listId = "5f940f2052d3b944ef43749b";
	const [list, setList] = useState({
		name: "",
		items: [],
		id: 0
	});
	const [newItem, setNewItem] = useState("");

	function getList(id){
	    fetch("http://localhost:5000/lists/" + id, {"method": "GET"})
	    .then(response => response.json())
	    .then(response => {
	    	setList(response.list);
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	function deleteItem(itemId) {
		fetch("http://localhost:5000/lists/" + listId + "/" + itemId, {"method": "DELETE"})
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
		fetch("http://localhost:5000/lists/" + listId + "/" + newItem, {"method": "PUT"})
	    .then(response => response.json())
	    .then(response => {
	    	console.log(response);
	    	setList(response.list);
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	function handleNewItemInput(event){
		setNewItem(event.target.value);
	}

	// Estraggo lista iniziale
	useEffect(() => {
		getList(listId);
	}, []);

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
					<div className="item ml-0">
						<input onChange={handleNewItemInput} value={newItem} type="text" placeholder="New Item" autoComplete="off" />
						<button onClick={putItem} className="circle-btn">+</button>
					</div>
				</ul>
			</div>
		</div>
		);
}

export default List;
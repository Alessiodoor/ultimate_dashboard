import React, {useState, useEffect} from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

function Lists(props) {
	const [lists, setLists] = useState([]);
	const [newListName, setNewListName] = useState("");

	function getLists(){
	    fetch("http://localhost:5000/lists", {"method": "GET"})
	    .then(response => response.json())
	    .then(response => {
	    	setLists(response.lists);
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	function createNewList(){
		fetch("http://localhost:5000/lists", {
	      "method": "POST",
	      headers: {
	        'Accept': 'application/json',
        	'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({listName: newListName})
	    })
	    .then(response => response.json())
	    .then(response => {
	      	getLists();
	      	// svuoto input text
	      	setNewListName("");
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	function handleNewListName(event){
		setNewListName(event.target.value);
	}

	// il secondo parametro di useEffect definisce ogni quanto chiamarlo,
	// ovvero quando si aggiorna la variabile
	// Estraggo le liste una volta
	useEffect(() => {getLists(); }, []);

	return (
		<div>
			<div className="box">
				<div className="box" id="heading">
					<h1 className="listTitle">Le tue liste</h1>
				</div>
				<ul>
					{lists.map((list) => {
						return (
							<div key={list._id} className="item">
								<p onClick={() => props.onChangeList(list._id)} className="listName">{list.name}</p>
							</div>
							);
					})}
				</ul>
				<div className="item ml-0">
					<input className="todolist_input" onChange={handleNewListName} type="text" value={newListName} placeholder="Crea una nuova lista" />
					<Fab onClick={createNewList}>
					    <AddIcon />
					</Fab>
				</div>
			</div>
		</div>
	);
}

export default Lists;
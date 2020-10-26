import React, {useState, useEffect} from "react";
import Item from "./Item";

function List (){
	const [list, setList] = useState({
		name: "",
		items: [],
		id: 0
	});

	function getList(listId){
	    fetch("http://localhost:5000/lists/" + listId, {
	      "method": "GET"
	    })
	    .then(response => response.json())
	    .then(response => {
	    	setList(response.list);
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	useEffect(() => {
	    const listId = "5f940f2052d3b944ef43749b";
		getList(listId);
	}, []);

	function deleteItem(id) {
		// TODO: va rimosso anche dal db, poi restituisce la lista e l'assegno
		setList(function(prevList) {
			var newItems = prevList.items.filter(function(item) {
				return item._id != id;
			})
			return {
				name: prevList.name,
				items: newItems,
				id: prevList.id
			}
		});
	}

	return (
		<div>
			<div className="box" id="heading">
				<h1 className="listTitle">Titolo</h1>
			</div>
			<div className="box">
				<ul>
					{list.items.map(function(item) {
						return (
							<Item key={item._id} onDelete={deleteItem} id={item._id} list={list.name} name={item.name} />
							);	
					})}
				</ul>
			</div>
		</div>
		);
}

export default List;
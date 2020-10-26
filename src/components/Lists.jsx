import React, {useState, useEffect} from "react";

function Lists(props) {
	const [lists, setLists] = useState([]);

	function getLists(){
	    fetch("http://localhost:5000/lists", {"method": "GET"})
	    .then(response => response.json())
	    .then(response => {
	    	setLists(response.lists);
	    })
	    .catch(err => { console.log(err); 
	    });
	}

	// Estraggo le liste
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
								<p className="listName">Lista1</p>
							</div>
							);
					})}
				</ul>
				<div className="item">
					<div className="item ml-0">
						<input onChange={() => {props.onChangeList()}}  type="text" name="newList" placeholder="Crea una nuova lista" />
						<button type="submit" className="circle-btn" name="submitNewList">+</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Lists;
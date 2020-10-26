import React, {useState} from "react";
import List from "./List";
import Lists from "./Lists";

function TodoList(props) {
	const [currentListId, setCurrentListId] = useState(0);

	function handleCurrentListChange(listId){
		setCurrentListId(listId);
	}
	return (
		<div className="col-sm-6">
			<List listName={props.listName}/>
			<Lists onChangeList={handleCurrentListChange} />
		</div>
		);
}

export default TodoList;
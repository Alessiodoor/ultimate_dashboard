import React, {useState} from "react";
import List from "./List";
import Lists from "./Lists";

function TodoList() {
	const [currentListId, setCurrentListId] = useState("5f940f2052d3b944ef43749b");

	function handleCurrentListChange(listId){
		setCurrentListId(listId);
	}

	// PAssaggio dati tra fratelli:
	// Prima passo dal child al parent tramite una funzione come props (onChangeList)
	// Poi nel child chiamo la funzione per aggiornare lo state del parent
	// Infine, passo lo state come props al secondo child, nel quale controllerò la variabile con un useEffect

	return (
		<div className="col-sm-6">
			<List listId={currentListId}/>
			<Lists onChangeList={handleCurrentListChange} />
		</div>
		);
}

export default TodoList;
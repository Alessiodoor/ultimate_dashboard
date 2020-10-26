import React, {useState, useEffect} from "react";

function Item (props) {
	return (
		<div className="item">
			<input onClick={() => {props.onDelete(props.id)}} type="checkbox" name="checkbox"/>
			<input type="hidden" name={props.list} />
			<p>{props.name}</p>
		</div>
		);
}

export default Item;
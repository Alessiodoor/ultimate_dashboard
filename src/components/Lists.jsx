import React from "react";

function Lists() {
	return (
		<div>
			<div className="box" id="heading">
				<h1>Le tue liste</h1>
			</div>

			<div className="box">
				<ul>
					<div className="item">
						<a href=""><p>Lista1</p></a>
					</div>
					<div className="item">
						<a href=""><p>Lista2</p></a>
					</div>
				</ul>
				<div className="item">
					<form action="/newList" method="post" className="item ml-0">
						<input type="text" name="newList" placeholder="Crea una nuova lista" />
						<button type="submit" className="circle-btn" name="submitNewList">+</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Lists;
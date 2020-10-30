import React from "react";
import avatarMale from "./../../images/img_avatar_male.png";
import avatarFemale from "./../../images/img_avatar_female.png";
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';

function Card (props) {

	return (
		<div className="col-sm-4">
			<div className="card" style={{"width": "18rem"}}>
			  <img style={props.user.gender === "other" ? {height: '286px'} : null} src={props.user.gender === "male" ? avatarMale : props.user.gender === "female" ? avatarFemale : null} className="card-img-top" alt="..." />
			  <div className="card-body">
			    <h5 className="card-title"><EmailIcon /> {props.user.username}</h5>
			    <p className="card-text"><PersonIcon /> {props.user.name} {props.user.surname}</p>
			  </div>
			</div>
		</div>
		); 
}

export default Card;
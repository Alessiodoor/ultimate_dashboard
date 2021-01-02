import React from "react";
import avatarMale from "./../../images/img_avatar_male.png";
import avatarFemale from "./../../images/img_avatar_female.png";
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function Card (props) {

	return (
		<div className="col-sm-4">
			<div className="card" style={{"width": "100%"}}>
			  <img style={props.user.gender === "other" ? {height: '286px'} : null} src={props.user.gender === "male" ? avatarMale : props.user.gender === "female" ? avatarFemale : null} className="card-img-top" alt="..." />
			  <div className="card-body">
			    <h5 className="card-title"><EmailIcon /> {props.user.username}</h5>
			    <p className="card-text"><PersonIcon /> {props.user.fName} {props.user.lName}</p>
			    <p className="card-text"><LocationOnIcon /> {props.user.city}</p>
			  </div>
			</div>
		</div>
		); 
}

export default Card;
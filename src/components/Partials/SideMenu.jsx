import React from "react";
import { push as Menu } from 'react-burger-menu';
import Typography from '@material-ui/core/Typography';

function SideMenu () {
	

	return (
		<Menu width={ '280px' } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
	        <Typography variant="h4">Componenti</Typography>
	        <a id="home" className="menu-item" href="/">Home</a>
      	</Menu>
      	);
}

export default SideMenu;
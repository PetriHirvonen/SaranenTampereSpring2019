import React from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {

	render() {
		return(
			<ul style={{listStyleType:"none"}}>
				<li><Link to="/">Shopping List</Link></li>
				<li><Link to="/form">Add to List</Link></li>
			</ul>
		)
	}

}
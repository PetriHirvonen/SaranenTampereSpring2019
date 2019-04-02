import React from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {

	render() {
		return(
			<ul style={{listStyleType:"none"}}>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/content">Content</Link></li>
				<li><Link to="/about">About</Link></li>
			</ul>
		)
	}

}
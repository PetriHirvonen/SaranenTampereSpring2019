import React from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {

	render() {
		if(this.props.isLogged) {
			return(
				<ul style={{listStyleType:"none"}}>
					<li><Link to="/list">Shopping List</Link></li>
					<li><Link to="/form">Add to List</Link></li>
					<li><Link to="/" onClick={this.props.logout}>Logout</Link></li>
				</ul>
			)
		} else {
			return(
				<div style={{height:65}}>
				</div>
			)	
		}
	}

}
import React from 'react';

export default class Label extends React.Component {

	changeColor = (event) => {
		console.log(event);
		this.props.colorChange();
	}

	render() {
		let labelStyle = {
			fontFamily:"sans-serif",
			fontWeight:"bold",
			padding:13,
			margin:0
		}
		return (
			<p style={labelStyle}
			   onClick={this.changeColor}	
			>{this.props.color}</p>
		)
	}
	
}
import React from 'react';
import {Button, Form} from 'semantic-ui-react';


export default class ShoppingForm extends React.Component {

	constructor(props) {
		super(props);
		this.state= {
			id:0,
			type:"",
			price:0,
			count:0
		}	
	}
	
	onChange = (event) => {
		let state ={};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	submit = (event) => {
		event.preventDefault();
		let tempItem = {
			id:0,
			type:this.state.type,
			price:this.state.price,
			count:this.state.count
		}
		this.props.addToList(tempItem);
		this.setState({
			id:0,
			type:"",
			count:0,
			price:0
		})

		
	}
	
	render() {
		
		return(
			<Form onSubmit={this.submit}>
				<Form.Field>
					<label>Type</label>
					<input type="text"
							name="type"
							onChange={this.onChange}
							value={this.state.type}/>
				</Form.Field>
				<Form.Field>
					<label>Count</label>
					<input type="number"
							name="count"
							onChange={this.onChange}
							value={this.state.count}/>
				</Form.Field>
				<Form.Field>
					<label>Price</label>
					<input type="number"
							name="price"
							onChange={this.onChange}
							value={this.state.price}/>
				</Form.Field>
				<Button type="submit">Add</Button>
			</Form>
		)
	}

}
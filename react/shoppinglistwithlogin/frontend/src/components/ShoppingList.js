import React from 'react';
import {Table, Button} from 'semantic-ui-react';

export default class ShoppingList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			search:"",
			editItem:0,
			id:0,
			type:"",
			count:0,
			price:0
		}
		
	}
	
	saveItem = () => {
		let item = {
			id:this.state.id,
			type:this.state.type,
			count:this.state.count,
			price:this.state.price
		}
		this.props.editList(item);
		this.cancel();
	}
	
	cancel = () => {
		this.setState({
			editItem:0,
			id:0,
			type:"",
			count:0,
			price:0
		})
	}
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}	
	
	searchList = () => {
		this.props.searchList(this.state.search);
	}
	
	removeFromList = (event) => {
		this.props.removeFromList(event.target.name);
	}
	
	editItem = (event) => {
		let tempId = parseInt(event.target.name,10);
		let tempItem = {};
		for(let i = 0;i<this.props.list.length;i++) {
			if(tempId === this.props.list[i].id) {
				tempItem = this.props.list[i];
			}
		}
		this.setState({
			editItem:tempId,
			id:tempId,
			type:tempItem.type,
			count:tempItem.count,
			price:tempItem.price
		});
	}
	
	render() {
		let listItems = <h2>Nothing on the list</h2>
		if(this.props.list.length > 0) {
			listItems = this.props.list.map((item) => {
				if(item.id === this.state.editItem) {
					return <Table.Row key={item.id}>
							   <Table.Cell>
									<input type="text"
										   name="type"
										   onChange={this.onChange}
										   value={this.state.type}/>
								</Table.Cell>
							    <Table.Cell>
									<input type="number"
										   name="count"
										   onChange={this.onChange}
										   value={this.state.count}/>
								</Table.Cell>
								<Table.Cell>
									<input type="number"
										   name="price"
										   onChange={this.onChange}
										   value={this.state.price}/>
								</Table.Cell>
								<Table.Cell>
									<Button onClick={this.saveItem}>Save</Button>
								</Table.Cell>
								<Table.Cell>
									<Button onClick={this.cancel}>Cancel</Button>
								</Table.Cell>
							</Table.Row>
				} else {
					return <Table.Row key={item.id}>
						<Table.Cell>{item.type}</Table.Cell>
						<Table.Cell>{item.count}</Table.Cell>
						<Table.Cell>{item.price}</Table.Cell>
						<Table.Cell><Button name={item.id} 
									onClick={this.removeFromList}>Remove</Button></Table.Cell>
						<Table.Cell><Button name={item.id} 
									onClick={this.editItem}>Edit</Button></Table.Cell>
					</Table.Row>
				}
			})
			return (
			<div>
				<label>Search by type:</label>
				<input type="text"
					   name="search"
					   onChange={this.onChange}
					   value={this.state.search}/>
				<Button onClick={this.searchList}>Search</Button>
				<hr/>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Type</Table.HeaderCell>
							<Table.HeaderCell>Count</Table.HeaderCell>
							<Table.HeaderCell>Price</Table.HeaderCell>
							<Table.HeaderCell>Remove</Table.HeaderCell>
							<Table.HeaderCell>Edit</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
					{listItems}
					</Table.Body>
				</Table>
			</div>
				
		) 
		} else {
			return (
			<div>
				<br/>
				<label>Search by type:</label>
				<input type="text"
					   name="search"
					   onChange={this.onChange}
					   value={this.state.search}/>
				<Button onClick={this.searchList}>Search</Button>
				<hr/>
				{listItems}
			</div>
		)}
		
	}

}
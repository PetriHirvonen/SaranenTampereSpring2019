import React from 'react';
import {Table, Button} from 'semantic-ui-react';

export default class ShoppingList extends React.Component {
	
	removeFromList = (event) => {
		this.props.removeFromList(event.target.name);
	}
	
	render() {
		let listItems = <h2>Nothing on the list</h2>
		if(this.props.list.length > 0) {
			listItems = this.props.list.map((item) => 
				<Table.Row key={item.id}>
					<Table.Cell>{item.type}</Table.Cell>
					<Table.Cell>{item.count}</Table.Cell>
					<Table.Cell>{item.price}</Table.Cell>
					<Table.Cell><Button name={item.id} 
								onClick={this.removeFromList}>Remove</Button></Table.Cell>
				</Table.Row>
			)
			return (
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Type</Table.HeaderCell>
							<Table.HeaderCell>Count</Table.HeaderCell>
							<Table.HeaderCell>Price</Table.HeaderCell>
							<Table.HeaderCell>Remove</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
					{listItems}
					</Table.Body>
				</Table>
				
		) 
		} else {
			return (
			<div>
				<br/>
				{listItems}
			</div>
		)}
		
	}

}
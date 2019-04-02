import React, { Component } from 'react';
import './App.css';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';

class App extends Component {
	
  constructor(props) {
	super(props);
	this.state= {
		list:[],
		id:100	
	}
  }

  addToList = (item) =>  {
	  item.id = this.state.id;
	  let tempId = this.state.id+1;
	  let tempArray =  this.state.list.concat(item);
	  this.setState({
		  list:tempArray,
		  id:tempId
	  })
  }  
  
  remove = (id) => {
	  let tempList = [];
	  let tempId = parseInt(id,10);
	  for(let i=0;i<this.state.list.length;i++) {
			if(this.state.list[i].id !== tempId) {
				tempList.push(this.state.list[i]);
			}				
	  }
	  this.setState({
		  list:tempList
	  })
  }
  render() {
    return (
      <div className="App">
		<ShoppingForm addToList={this.addToList}/>
		<hr/>
		<ShoppingList list={this.state.list}
					  removeFromList={this.remove}/>
      </div>
    );
  }
}

export default App;

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
  render() {
    return (
      <div className="App">
		<ShoppingForm addToList={this.addToList}/>
		<ShoppingList list={this.state.list}/>
      </div>
    );
  }
}

export default App;

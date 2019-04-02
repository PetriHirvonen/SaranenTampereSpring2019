import React, { Component } from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import NavBar from './components/NavBar';
import {Switch,Route,Redirect} from 'react-router-dom';

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
		<NavBar/>
		<hr/>
		<Switch>
			<Route exact path="/" render={() => (
				<ShoppingList list={this.state.list}
					removeFromList={this.remove}/>
			)}/>
			<Route path="/form" render={() => (
				<ShoppingForm addToList={this.addToList}/>		
			)}/>
			<Route render={() => (<Redirect to="/"/>)}/>
		</Switch>

      </div>
    );
  }
}

export default App;

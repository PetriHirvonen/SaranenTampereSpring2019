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
			list:[]
		}
	 }
	 
	 getList = () => {
		 let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		 }
		 fetch("/api/shoppinglist",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					console.log(data);
					this.setState({
						list:data
					})
				}).catch(error => {
					console.log(error);
				})				
			} else {
				console.log("Fetching list not ok:"+response.status);
			}
		 }).catch(error => {
			console.log(error); 
		 });	 
	 }
	 
	 componentDidMount() {
		 this.getList();
	 }

	addToList = (item) =>  {
		 let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		 }
		 fetch("/api/shoppinglist",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					console.log(data);
					this.getList();
				}).catch(error => {
					console.log(error);
				})				
			} else {
				console.log("Fetching list not ok:"+response.status);
			}
		 }).catch(error => {
			console.log(error); 
		 });	  
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

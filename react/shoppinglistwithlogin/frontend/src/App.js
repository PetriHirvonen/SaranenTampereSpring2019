import React, { Component } from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import {Switch,Route,Redirect} from 'react-router-dom';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state= {
			list:[],
			isLogged:false,
			token:""
		}
	 }
	 
	 //LOGIN API
	 
	 register = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)				
		}
		fetch("/register",request).then(response => {
			if(response.ok) {
				alert("Register success");
			} else {
				alert("Register failed");
			}
		}).catch(error => {
			console.log(error);
		}); 
	 }
	 
	 login = (user) => {
		 let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)			 
		 }
		 fetch("/login",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						isLogged:true,
						token:data.token
					},() => {
						this.getList();
					});
				}).catch(error => {
					console.log(error);
				});
			} else {
				console.log("Login failed: reason:"+response.status);
			} 				
		 }).catch(error => {
			 console.log(error);
		 });
		 
	 }
	 
	 
	 //SHOPPINGLIST API
	 
	 getList = () => {
		 let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token}
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
	 

	addToList = (item) =>  {
		 let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token},
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
	   let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token}
		 }
		 fetch("/api/shoppinglist/"+id,request).then(response => {
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
  
  render() {
    return (
      <div className="App">
		<NavBar isLogged={this.state.isLogged}/>
		<hr/>
		<Switch>
			<Route exact path="/" render={() => (
				<LoginForm onRegister={this.register}
				           onLogin={this.login}/>
			)}/>
			<Route path="/list" render={() => (
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

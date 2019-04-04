import React, { Component } from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state= {
			list:[],
			isLogged:false,
			token:""
		}
	 }
	 
	 //SESSIONSTORAGE API
	 
	 saveToStorage = () => {
		 sessionStorage.setItem("state",JSON.stringify(this.state));
	 }
	 
	 getFromStorage = () => {
		 if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			this.setState(state);
		 }
	 }
	 
	 //LIFECYCLE FUNCTION
	 
	 componentDidMount() {
		 this.getFromStorage();
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
						this.saveToStorage();
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
	 
	 logout = () => {
		 let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token}	 
		 }
		 fetch("/logout",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						isLogged:false,
						token:"",
						list:[]
					},() => {
						this.saveToStorage();
					});
				}).catch(error => {
					console.log(error);
				});
			} else {
				console.log("Logout failed: reason:"+response.status);
			} 				
		 }).catch(error => {
			 console.log(error);
		 });
		 		 
	 }
	 
	 
	 //SHOPPINGLIST API
	 
	 getList = (query) => {
		 let url = "/api/shoppinglist";
		 if(query) {
			 url = url+"?type="+query;
		 }
		 let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token}
		 }
		 fetch(url,request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					console.log(data);	
					this.setState({
						list:data
					}, () => {
						this.saveToStorage();
					});
				}).catch(error => {
					console.log(error);
				})				
			} else {
				console.log("Fetching list not ok:"+response.status);
				if(response.status === 403) {
					alert("Session invalidated. Login again");
					this.setState({
						isLogged:false,
						token:"",
						list:[]
					})
				}
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
					this.props.history.push("/list");
				}).catch(error => {
					console.log(error);
				})				
			} else {
				console.log("adding to list not ok:"+response.status);
				if(response.status === 403) {
					alert("Session invalidated. Login again");
					this.setState({
						isLogged:false,
						token:"",
						list:[]
					})
				}
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
				console.log("removing list not ok:"+response.status);
				if(response.status === 403) {
					alert("Session invalidated. Login again");
					this.setState({
						isLogged:false,
						token:"",
						list:[]
					})
				}
			}
		 }).catch(error => {
			console.log(error); 
		 });	 
  }
  
  editItem = (item) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token},
			body:JSON.stringify(item)
		 }
		 fetch("/api/shoppinglist/"+item.id,request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					console.log(data);
					this.getList();
				}).catch(error => {
					console.log(error);
				})				
			} else {
				console.log("removing list not ok:"+response.status);
				if(response.status === 403) {
					alert("Session invalidated. Login again");
					this.setState({
						isLogged:false,
						token:"",
						list:[]
					})
				}
			}
		 }).catch(error => {
			console.log(error); 
		 });	 	  
	  
  }
  
  render() {
    return (
      <div className="App">
		<NavBar isLogged={this.state.isLogged}
		        logout={this.logout}/>
		<hr/>
		<Switch>
			<Route exact path="/" render={() => (
				this.state.isLogged ?
				(<Redirect to="/list"/>):				
				(<LoginForm onRegister={this.register}
				           onLogin={this.login}/>)
			)}/>
			<Route path="/list" render={() => (
				this.state.isLogged ?
				(<ShoppingList list={this.state.list}
					removeFromList={this.remove}
					searchList={this.getList}
					editList={this.editItem}/>):
				(<Redirect to="/"/>)
			)}/>
			<Route path="/form" render={() => (
				this.state.isLogged ?
				(<ShoppingForm addToList={this.addToList}/>):
				(<Redirect to="/"/>)
			)}/>
			<Route render={() => (<Redirect to="/"/>)}/>
		</Switch>

      </div>
    );
  }
}

export default withRouter(App);

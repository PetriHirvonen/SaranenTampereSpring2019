import React from 'react';
import {Form, Button} from 'semantic-ui-react';

export default class LoginForm extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			username:"",
			password:""
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	onRegister = () => {
		if(this.state.username.length < 3 || this.state.password.length < 8) {
			alert("Username needs to be atleast 3 characters and password 8");
			return;
		}
		let user = {
			"username":this.state.username,
			"password":this.state.password
		}
		this.props.onRegister(user);
	}
	
	onLogin = () => {
		if(this.state.username.length < 3 || this.state.password.length < 8) {
			alert("Username needs to be atleast 3 characters and password 8");
			return;
		}
		let user = {
			"username":this.state.username,
			"password":this.state.password
		}
		this.props.onLogin(user);
	}
	
	render() {
		return(
			<Form>
				<Form.Field>
					<label>Username:</label>
					<input type="text"
						   name="username"
						   onChange={this.onChange}
						   value={this.state.username}/>
				</Form.Field>
				<Form.Field>
					<label>Password:</label>
					<input type="password"
						   name="password"
						   onChange={this.onChange}
						   value={this.state.password}/>
				</Form.Field>
				<Button onClick={this.onRegister}>Register</Button>
				<Button onClick={this.onLogin}>Login</Button>
			</Form>
		)
		
	}
}
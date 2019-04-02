import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './components/Home';
import Content from './components/Content';
import About from './components/About';
import NavBar from './components/NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
	    <NavBar/>
		<hr/>
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route path="/content" component={Content}/>
			<Route path="/about" component={About}/>
			<Route render={() => (<Redirect to="/"/>)}/>
		</Switch>
      </div>
    );
  }
}

export default App;

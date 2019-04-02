import React, { Component } from 'react';
import './App.css';
import HelloWorld from './HelloWorld';

class App extends Component {
  render() {
    return (
      <div className="App">
			<h1>Hello World</h1>
			<HelloWorld />
			<HelloWorld name="Erno"/>
      </div>
    );
  }
}

export default App;

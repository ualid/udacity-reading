import React, { Component } from 'react';
import './App.css';
import Panel from './Panel';
import CardSimple from './CardSimple';

class App extends Component {
  render() {
    const test = [1, 2, 3];

    return (
      <div className="App" >
          <CardSimple >
          {test.map((item, index) => (
                <div className="row" key={index}>
                <Panel />
              </div>
                  ))}
            </CardSimple >     
      </div>
    );
  }
}

export default App;

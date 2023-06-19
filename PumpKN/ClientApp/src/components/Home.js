import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Welcome to my PumpKN Solution</h1>
        <p>This is my WIP solution to a technical challenge</p>
        <br></br>
        <p>To get started, you can click the button below to visit the menu:</p>
        <button onClick={() => window.location.href = '/menu'}>Go to Menu</button>
      </div>
    );
    
  }
}

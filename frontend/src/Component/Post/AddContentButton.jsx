import axios from 'axios';
import React, { Component }  from 'react';

export class AddConetentButton extends Component {
    
  addImage() {

  }  

  render() {
    return (
      <div className="App">
        <h1>hello world</h1>
        <button onClick={this.addImage}>Add Image</button>
        <button>Add Paragraph</button>
        <button>Add Headline</button>
        <button>Add List</button>
        <button>Add Table</button>
      </div>
    )
  }
}
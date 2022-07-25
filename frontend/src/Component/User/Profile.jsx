import { get } from 'axios';
import React, { Component }  from 'react';

export class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: [],
    }
  }

  componentDidMount() {
    get("/users/me").then((data) => {
      console.log(data.data.data.user);
      this.setState({ userData: data.data.data.user })
      console.log(this.state.userData);
    }).catch((err) => {
        console.error(err)
    })
  }

  render() {
    return (
      <div>
        <h1>hello world</h1>
        {this.state.userData.name}
      </div>
    )
  }
}
import React, { Component } from "react";
import axios from "axios";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChangeUserEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeUserPassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/users/login", userObject)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ email: "", password: "" });
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.onChangeUserEmail}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.onChangeUserPassword}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}
       
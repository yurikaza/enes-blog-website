import React, { Component }  from 'react';
import axios from "axios";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onChangeUserPasswordConfirm = this.onChangeUserPasswordConfirm.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
  }

  onChangeUserName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeUserEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeUserPassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeUserPasswordConfirm(e) {
    this.setState({ passwordConfirm: e.target.value });
  }

  onChangeLocation(e) {
    this.setState({ location: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

   const userObject = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    axios
      .post("/users/signup", userObject)
      .then((res) => {
        console.log(res.data);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ name: "", email: "", password: "", passwordConfirm: "", location: "" });
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChangeUserName}
              className="form-control"
            />
          </div>
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
            <label>Password Confirm</label>
            <input
              type="password"
              value={this.state.passwordConfirm}
              onChange={this.onChangeUserPasswordConfirm}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              value={this.state.location}
              onChange={this.onChangeLocation}
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
   
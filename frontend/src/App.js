import "./App.css";
import { get } from 'axios';
import { Switch, Route } from "react-router-dom";
import React, { Component }  from 'react';
import { Home } from "./Container/Home";
import { Register } from "./Component/User/Register";
import { Login } from "./Component/User/Login";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Profile } from "./Component/User/Profile";
import { Conetent } from "./Component/Post/Content";
import { ViewPost } from "./Component/Post/ViewPost";
import { AllPosts } from "./Component/Post/AllPosts";
import { MyNavbar } from "./Component/Layout/Navbar";


class App extends Component {
  logout() {
    get("/users/me/logout").then((data) => {
      console.log(data.data.data.user);
      this.setState({ userData: data.data.data.user })
      console.log(this.state.userData);
      window.location.href = "/";
    }).catch((err) => {
        console.error(err)
    })
  } 
  render() {
    return (
      <div>
          <div>
            <MyNavbar />
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/regsiter" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/user/profile" component={Profile} />
            <Route exact path="/admin/createBlog" component={Conetent} />
            <Route exact path="/posts/viewPosts/:id" component={ViewPost} />
            <Route exact path="/posts" component={AllPosts} />
          </Switch>
      </div>
    )
  }
}

export default App;

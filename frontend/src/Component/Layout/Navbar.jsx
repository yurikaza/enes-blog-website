import { Container, Navbar, Nav } from "reactstrap"; 
import { get } from 'axios';
import React, { Component }  from 'react';
import { Link } from 'react-router-dom';

export class MyNavbar extends Component {

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

  navbar() {
    let user = [];
    let isAdmin;

    get("/users/me").then((data) => {
      console.log(data.data.data.user);
      user.push(data.data.data.user)
      isAdmin = data.data.data.user.admin;
    }).catch((err) => {
        console.error(err)
    })

    let items = [];

    if(!user.length) {
        items.push(
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to="/regsiter">regsiter</Link></Nav.Link>
                        <Nav.Link><Link to="/login">login</Link></Nav.Link>
                        <Nav.Link><Link to="/posts">Blogs</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    } else if(isAdmin === true) {
        items.push(
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to="/regsiter">regsiter</Link></Nav.Link>
                        <Nav.Link><Link to="/login">login</Link></Nav.Link>
                        <Nav.Link><Link to="/posts">Blogs</Link></Nav.Link>
                        <Nav.Link><Link to="/user/profile">profile</Link></Nav.Link>
                        <Nav.Link><Link to="/admin/createBlog">Create Blog</Link></Nav.Link>
                        <button onClick={this.logout}>logout</button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    } else {
        items.push(
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to="/regsiter">regsiter</Link></Nav.Link>
                        <Nav.Link><Link to="/login">login</Link></Nav.Link>
                        <Nav.Link><Link to="/posts">Blogs</Link></Nav.Link>
                        <Nav.Link><Link to="/user/profile">profile</Link></Nav.Link>
                        <button onClick={this.logout}>logout</button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    }

    return(
        <div>
            {items}
        </div>
    )
    
  }

  render() {
    return (
        <div>
         {this.navbar}
        </div>
    );
  }
} 

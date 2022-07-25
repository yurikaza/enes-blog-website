import axios from 'axios';
import React, { Component }  from 'react';
import { Link } from 'react-router-dom';

export class AllPosts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postArray: []
    }
  }

  componentDidMount() {
     axios.get("/posts/getAll").then((res) => {
      this.setState({ postArray: res.data.data.post.reverse() })
      console.log(this.state.postArray);
      console.log(this.state.postArray[0].headline);
     })
  }

  render() {
    return (
      <div>
        <h1>Post</h1>
        <div>
          {this.state.postArray.map((data) => (
          <Link to={`/posts/viewPosts/${data._id}`}>
                <p>{data.headline}</p>
          </Link>
          ))}
        </div>
      </div>
    )
  }
}
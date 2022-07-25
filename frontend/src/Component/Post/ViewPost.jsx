import axios from 'axios';
import React, { Component }  from 'react';

export class ViewPost extends Component {
  constructor(props) {
    super(props)

    this.blogContent = this.blogContent.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    
    this.state = {
      postArray: [],
      constent: [],
      commentArray: [],
      likes: [],
      comment: "",
    }
  }

  onChangeComment(e) {this.setState({ comment: e.target.value })}

  componentDidMount() {
    const link = window.location.href;
    const postId = link.slice(-24)

    axios.get(`/posts/seePost/${postId}`).then((res) => {
      console.log(res);
      this.setState({ 
        postArray: res.data.data.video,
        constent: res.data.data.video.content,
        commentArray: res.data.data.comment.reverse(),
        likes: res.data.data.likes 
      })

      console.log(this.state.postArray.content);
      console.log(this.state.commentArray);
      console.log(this.state.likes);
     })
  }

  blogContent(data) {
    try {
      
      let items = [];

      console.log(data.slice(0, 5));
      if(data.slice(0, 5) === "https") {
        items.push(
          <img src={data} width="300px" />
        )
      } else if(data.slice(0, 3) === "h2 ") {
        data = data.substring(3);

        items.push(
          <div>
            <br />
            <h2>{data}</h2>
            <br />
          </div>
        )
      } else {
        items.push(
          <p>{data}</p>
        )
      }

      return (
        <div>
          {items}
        </div>
      )

    } catch (error) {
      console.log(error); 
    }
  }

  sendComment(e) {
    e.preventDefault();

    const link = window.location.href;
    const postId = link.slice(-24)

    const postObject = {
      comment: this.state.comment,
    };

    axios.post(`/comment/createComment/${postId}`, postObject).then((res) => {
      console.log(res.data.data.post);
      const stateComment = this.state.commentArray;
      stateComment.push(res.data.data.post);
      console.log(this.state.commentArray);
      this.setState({ commentArray: stateComment });
    })

    this.setState({ comment: "" });
  }

  async likePost(e) {
    e.preventDefault()

    const link = window.location.href;
    const postId = link.slice(-24)

    axios.post(`/posts/likePost/${postId}`).then((res) => {
      console.log(res.data.data);
    })
  }

  render() {
    return (
      <div>
        <h1> {this.state.postArray.headline} </h1>
        <hr />
        {this.state.constent.map((data) => (
          <div>
            {this.blogContent(data)}
          </div>
        ))}

        <form onSubmit={(e) => this.likePost(e)}>
          <button type="submit">Like</button>
        </form>

        <form onSubmit={(e) => this.sendComment(e)}>
           <input
              type="text" 
              value={this.state.comment} 
              onChange={this.onChangeComment} 
            />
            <button type="submit">Send Comment</button>
        </form>


        {this.state.commentArray.map((data) => (
          <div>
             <p>{data.userName}: {data.comment}</p>
          </div>
        ))}
      </div>
    )
  }
}
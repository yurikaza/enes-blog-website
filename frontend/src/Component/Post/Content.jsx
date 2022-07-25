import axios from 'axios';
import React from 'react';
import { Web3Storage } from "web3.storage";

export class Conetent extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeHeadline = this.onChangeHeadline.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.createPost = this.createPost.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);

    this.state = {
      headline: "",
      category: "",
      content: [],
      myFile: null,
      imagesArray: "",
    };
  }

  onChangeHeadline(e) {this.setState({ headline: e.target.value })}
  onChangeCategory(e) {this.setState({ category: e.target.value })}
  fileChangedHandler(e) {
    this.setState({ myFile: e.target.files[0] });
  }
  
  onChangeContent(index, e) {
     var contet = this.state.content.slice();

     contet[index] = e.target.value;

     this.setState({
       content: contet
     });
  }

  async onChangeImage(e) {
    e.preventDefault();

    console.log(this.state.myFile);

    const formData = new FormData();
    formData.append("myFile", this.state.myFile, this.state.myFile.name);
    axios.post("/posts/sendImage", formData).then((res) => {
        console.log(res);
        this.setState({ imagesArray: res.data.data.image })
    })
    .catch((error) => {
        console.log(error);
    });
  }

  createPost(e) {
    e.preventDefault();

    const postObject = {
      headline: this.state.headline,
      category: this.state.category,
      content: this.state.content,
    };
    console.log(postObject);
    axios.post("/posts/createPost", postObject).then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    });

    this.setState({ headline: "", category: "", content: "" });
  }

  inputLoop() {

    let items = [];

    for (let index = 0; index < 99; index += 2) {
      items.push(
        <div>
            <input type="text" value={this.state.content[index]} onChange={this.onChangeContent.bind(this, index)} />
            <input type="text" value={this.state.content[index + 1]} onChange={this.onChangeContent.bind(this, index + 1)} />
        </div>
      )
    }

    return (
      <div>
        {items}
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Create Blog Page</h1>
            <input type="file" multiple onChange={this.fileChangedHandler} />
            <button onClick={this.onChangeImage}>Send Image to Database</button>
        <br /> <br />  
        {this.state.imagesArray}
        <br /><br />
        <form onSubmit={(e) => this.createPost(e)}>
            <label htmlFor="">Headline</label>
            <input
              type="text"
              value={this.state.headline}
              onChange={this.onChangeHeadline}
              className="form-control"
            />
            <label htmlFor="">Category</label>
            <input
              type="text"
              value={this.state.category}
              onChange={this.onChangeCategory}
              className="form-control"
            />
            <label htmlFor="">Content</label>
            <div>{this.inputLoop()}</div>
            <button type="submit">Create Post</button>
        </form>
        <div id='global'></div>
      </div>
    )
  }
}

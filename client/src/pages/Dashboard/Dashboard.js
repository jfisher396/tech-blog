import React, { Component } from "react";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import API from "../../utils/API";

class Dashboard extends Component {
  state = {
    userPosts: [],
    newPostFormBoolean: false,
    showNewPostButton: true,
    newPost: {
      title: "",
      body: "",
    },
  };

  componentDidMount() {
    API.getUserPosts().then((res) => {
      this.setState({ userPosts: res.data });
    });
  }

  showNewPostFormButton = (e) => {
    e.preventDefault();
    this.setState({
      newPostFormBoolean: true,
      showNewPostButton: false,
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newPost: {
        ...this.state.newPost,
        [name]: value,
      },
    });
  };

  handleNewPostFormSubmit = (e) => {
    e.preventDefault();
    API.newPost(this.state.newPost).then((res) => {
      console.log(res);
    });
  };

  render() {
    // console.log(this.state.userPosts)

    return (
      <Container>
        <h1>User Dashboard</h1>
        {this.state.showNewPostButton && (
          <button
            type="submit"
            className="button is-success"
            onClick={this.showNewPostFormButton}
          >
            New Post
          </button>
        )}

        {this.state.newPostFormBoolean && (
          <>
            <label className="label" htmlFor="new-post-form">
              Add a new post:
            </label>
            <form
              className="field"
              id="new-post-form"
              onSubmit={this.handleNewPostFormSubmit}
            >
              <label className="label" htmlFor="post-title">
                Title
              </label>
              <div className="control">
                <input
                  onChange={this.handleInputChange}
                  id="post-title"
                  className="input"
                  type="text"
                  name="title"
                  value={this.state.newPost.title}
                  placeholder="Enter post title"
                />
                <label className="label" htmlFor="post-body">
                  Message
                </label>
                <div className="control">
                  <textarea
                    onChange={this.handleInputChange}
                    id="post-body"
                    className="textarea"
                    name="body"
                    value={this.state.newPost.body}
                    placeholder="Enter your post here"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="button is-success">
                Submit
              </button>
            </form>
          </>
        )}

        {this.state.userPosts.map((post, index, array) => (
          <Card
            key={post.id}
            id={post.id}
            postTitle={post.title}
            postBody={post.postBody}
            // postCreator={array[index].user.username}
            postCreatedDate={post.createdAt.slice(0, 10)}
            postCreatedTime={post.createdAt.slice(11, 16)}
          />
        ))}
      </Container>
    );
  }
}

export default Dashboard;

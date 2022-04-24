import React, { Component } from "react";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import API from "../../utils/API";

class Dashboard extends Component {
  state = {
    userPosts: [],
    newPostFormBoolean: false,
  };

  componentDidMount() {
    API.getUserPosts().then((res) => {
      this.setState({ userPosts: res.data });
    });
  }

  showNewPostFormButton = (e) => {
    e.preventDefault();
    this.setState({ newPostFormBoolean: true });
  };

  render() {
    // console.log(this.state.userPosts)

    return (
      <Container>
        <h1>Dashboard</h1>
        <button
          type="submit"
          className="button is-success"
          onClick={this.showNewPostFormButton}
        >
          New Post
        </button>

        {this.state.newPostFormBoolean && (
          <form className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="post-title"
                placeholder="Enter post title"
              />
              <label class="label">Message</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="post-body"
                  placeholder="Enter your post here"
                ></textarea>
              </div>
            </div>
          </form>
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

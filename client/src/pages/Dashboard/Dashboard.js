import React, { Component } from "react";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import API from "../../utils/API";

class Dashboard extends Component {
  state = {
    userPosts: [],
    newPostFormBoolean: false,
    showNewPostButton: true,
    editPostFormBoolean: false,
    newPost: {
      postTitle: "",
      postBody: "",
    },
    postUpdate: {},
    loading: false,
  };

  getPosts = () => {
    API.getUserPosts()
      .then((res) => {
        this.setState({ loading: true });
        const posts = res.data;
        this.setState({ userPosts: posts.sort((a, b) => b.id - a.id) });
      })
      .then(() => this.setState({ loading: false }));
  };

  componentDidMount() {
    this.getPosts();
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
    if (this.state.newPost.postTitle && this.state.newPost.postBody) {
      API.newPost(this.state.newPost).then(() => {
        this.setState({
          newPost: {
            postTitle: "",
            postBody: "",
          },
          newPostFormBoolean: false,
          showNewPostButton: true,
        });
        this.getPosts();
      });
    }
  };

  handlePostSelect = (post) => {
    this.setState({
      postUpdate: {
        ...post,
      },
      editPostFormBoolean: true,
    });
  };

  handleEditFormInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      postUpdate: {
        ...this.state.postUpdate,
        [name]: value,
      },
    });
  };

  handleEditFormSubmit = (e) => {
    e.preventDefault();
    API.editPost(this.state.postUpdate).then(() => {
      this.setState({
        editPostFormBoolean: false,
      });
      this.getPosts();
    });
  };

  handlePostDelete = (e) => {
    e.preventDefault();
    API.deletePost(this.state.postUpdate.id).then(() => {
      this.setState({
        editPostFormBoolean: false,
      });
      this.getPosts();
    });
  };

  render() {
    return (
      <>
        {/* page heading */}
        <h1 className="is-size-2 has-text-centered">User Dashboard</h1>

        {/* show add new post button when not showing form */}
        {this.state.showNewPostButton && !this.state.editPostFormBoolean && (
          <button
            type="submit"
            className="button is-success"
            onClick={this.showNewPostFormButton}
          >
            Add New Post
          </button>
        )}

        {/* once add new post button is clicked, show form to add post */}
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
                  name="postTitle"
                  value={this.state.newPost.postTitle}
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
                    name="postBody"
                    value={this.state.newPost.postBody}
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
        {/* when a post title is clicked a form to edit the post is rendered */}
        {this.state.editPostFormBoolean && (
          <>
            <label className="label" htmlFor="edit-post-form">
              Edit your post:
            </label>
            <form
              className="field"
              id="edit-post-form"
              onSubmit={this.handleEditPostFormSubmit}
            >
              <label className="label" htmlFor="post-title">
                Title
              </label>
              <div className="control">
                <input
                  onChange={this.handleEditFormInputChange}
                  id="post-title"
                  className="input"
                  type="text"
                  name="postTitle"
                  value={this.state.postUpdate.postTitle}
                />
                <label className="label" htmlFor="post-body">
                  Message
                </label>
                <div className="control">
                  <textarea
                    onChange={this.handleEditFormInputChange}
                    id="post-body"
                    className="textarea"
                    name="postBody"
                    value={this.state.postUpdate.postBody}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="button is-success"
                onClick={this.handleEditFormSubmit}
              >
                Submit
              </button>
              <button
                type="submit"
                className="button is-danger"
                onClick={this.handlePostDelete}
              >
                Delete Post
              </button>
            </form>
          </>
        )}

        {/* if neither the new post form or edit post form are rendered then show all posts from user */}
        <Container>
          {!this.state.loading &&
            !this.state.newPostFormBoolean &&
            !this.state.editPostFormBoolean &&
            this.state.userPosts.map((post, index, array) => (
              <Card
                handlePostSelect={this.handlePostSelect}
                key={post.id}
                id={post.id}
                postTitle={post.postTitle}
                postBody={post.postBody}
                // postCreator={array[index].user.username}
                postCreatedDate={post.createdAt.slice(0, 10)}
                postCreatedTime={post.createdAt.slice(11, 16)}
              />
            ))}

          {this.state.loading ? (
            <progress
              className="progress is-large is-success"
              max="100"
            ></progress>
          ) : null}
        </Container>
      </>
    );
  }
}

export default Dashboard;

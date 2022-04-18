import React, { Component } from "react";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import API from "../../utils/API";

class Dashboard extends Component {

  state= {
    userPosts: []
  }

  componentDidMount() {
    API.getUserPosts().then((res) => {
      
      this.setState({ userPosts: res.data })
    })
  }



  render() {
    console.log(this.state.userPosts)
    return (
    <Container>
      <h1>Dashboard</h1>
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
      )) }

    </Container>
    )
  }
}

export default Dashboard;

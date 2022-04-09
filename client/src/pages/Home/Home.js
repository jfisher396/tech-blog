import React, { Component } from "react"
import axios from 'axios'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
      this.postsAPI();
  }

  postsAPI(){
      axios.get("/api/posts").then((res) => {
          console.log(res.data)
      }).catch((err) => console.log(err))
  }

  render() {
    return (
      <>
        <h1>Homepage</h1>
      </>
    );
  }
}

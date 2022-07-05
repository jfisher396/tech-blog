import React, { useEffect, useState } from "react";
import "./Home.css";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import API from "../../utils/API";
import SinglePost from "../SinglePost/SinglePost";

function Home(props) {
  // state handler for all posts
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState(null);
  const [singlePostView, setSinglePostView] = useState(false);

  // retrieves all posts from database
  useEffect(() => {
    loadPosts();
  }, []);

  // if no current user then render returns all posts
  useEffect(() => {
    if (!props.currentUser) {
      setSinglePostView(false);
    }
  }, [props.currentUser]);

  // loads all posts by all users
  function loadPosts() {
    API.getPosts().then((res) => {
      const posts = res.data;
      setPosts(posts.sort((a,b) => b.id - a.id));
    });
  }

  function handlePostSelect(post) {
    if (props.currentUser) {
      API.getSinglePost(post.id).then((res) => {
        setSinglePost(res.data);
        setSinglePostView(true);
      });
    } else {
      alert("You must be logged in");
    }
  }

  return (
    <Container>
      {!singlePostView
        ? posts.map((post, index, array) => (
            <Card
              handlePostSelect={handlePostSelect}
              key={post.id}
              id={post.id}
              postTitle={post.postTitle}
              postBody={post.postBody}
              postCreator={array[index].user.username}
              postCreatedDate={post.createdAt.slice(0, 10)}
              postCreatedTime={post.createdAt.slice(11, 16)}
            />
          ))
        : null}

      {singlePostView ? <SinglePost singlePost={singlePost} /> : null}
    </Container>
  );
}

export default Home;

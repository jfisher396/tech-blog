import React, { useEffect, useState } from "react";
import "./Home.css";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import API from "../../utils/API";

function Home() {
  // state handler for all posts
  const [posts, setPosts] = useState([]);

  // retrieves all posts from database
  useEffect(() => {
    loadPosts();
  }, []);

  function loadPosts() {
    API.getPosts().then((res) => {
      setPosts(res.data);
    });
  }

  return (
    <Container>
      {posts.map((post, index, array) => (
        <Card
          key={post.id}
          id={post.id}
          postTitle={post.title}
          postBody={post.postBody}
          postCreator={array[index].user.username}
          postCreatedDate={post.createdAt.slice(0, 10)}
          postCreatedTime={post.createdAt.slice(11, 16)}
        />
      ))}
    </Container>
  );
}

export default Home;

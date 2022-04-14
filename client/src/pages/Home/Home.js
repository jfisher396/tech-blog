import React, { useEffect, useState } from "react";
import "./Home.css";
import Container from "../../components/Container/Container";
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

  
  // console.log(posts);

  

  return <Container posts={posts} />;
}

export default Home;

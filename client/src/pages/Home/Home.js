import React, { useEffect, useState } from "react";
import API from "../../utils/API";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  function loadPosts() {
    API.getPosts().then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }

  return <div>Home</div>;
}

export default Home;

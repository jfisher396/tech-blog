import React, { useEffect, useState } from "react";
import "./Home.css";
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

  return (
    <>
      <div className="posts-container">
        <div>
          {posts.map((post) => {
            return (
              <div key={post.id}>
                <h3>Title: {post.title}</h3>
                <p>{post.postBody}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;

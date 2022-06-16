import React, { useEffect, useState } from "react";
import "./Home.css";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import API from "../../utils/API";

function Home() {
  // state handler for all posts
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState(null);
  const [singlePostView, setSinglePostView] = useState(false);

  // retrieves all posts from database
  useEffect(() => {
    loadPosts();
  }, []);

  function loadPosts() {
    API.getPosts().then((res) => {
      setPosts(res.data);
    });
  }

  function handlePostSelect(post) {
    API.getSinglePost(post.id).then((res) => {
      setSinglePost(res.data);
      setSinglePostView(true);
    });
  }

  return (
    <Container>

      {!singlePostView ? posts.map((post, index, array) => (
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
      )) : null }

      {singlePostView ? (
        <div>
          <p>{singlePost.postTitle}</p>
          <p>{singlePost.postBody}</p>
          <p>{singlePost.user.username}</p>
          <p>{singlePost.createdAt}</p>
          {singlePost.comments.map((comment) => (
            <p key={comment.id}>{comment.commentBody}</p>
          ))}
        </div>
      ) : null}
    </Container>
  );
}

export default Home;

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

      {singlePostView ? (
        <div>
          <div className="block"></div>
          <p className="is-size-3 px-4">{singlePost.postTitle}</p>
          <div className="block"></div>
          <p className="is-size-5 px-4">{singlePost.postBody}</p>
          <div className="block"></div>
          <p className="is-size-5 px-4">
            Posted by: {singlePost.user.username}
          </p>
          <div className="block"></div>
          <p className="is-size-6 px-4">Posted on: {singlePost.createdAt}</p>

          {/* if there are comments then render the header, otherwise don't */}
          <div className="block"></div>
          {singlePost.comments.length > 0 ? (
            <h2 className="is-size-4 px-4">Comments:</h2>
          ) : null}

          {/* render comments */}
          {singlePost.comments.map((comment) => (
            <>
              <div className="block"></div>
              <p className="is-size-6 px-5" key={comment.id}>
                {comment.commentBody}
              </p>
              <p>{comment.user_id}</p>
            </>
          ))}
        </div>
      ) : null}
    </Container>
  );
}

export default Home;

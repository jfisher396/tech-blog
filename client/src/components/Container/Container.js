import React from "react";
import "./Container.css";

function Container(props) {
  console.log(props)
  return (
    <div className="container">
      <div>
        {props.posts.map((post) => {
          return (
            <div key={post.id}>
              <h3>Title: {post.title}</h3>
              <p>{post.postBody}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Container;

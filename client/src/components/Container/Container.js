import React from "react";
import "./Container.css";

function Container(props) {
  
  return (
    <div className="container">
      <div>
        {props.posts.map((post, index, array) => {
          console.log(array[index])
          return (
            <div key={post.id} className="card">
              <header className="card-header">
                <div className="card-header-title">{post.title}</div>
              </header>
              <div className="card-content">
                <p>{post.postBody}</p>
                <p>Posted by: {array[index].user.username} on {post.createdAt}</p>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Container;

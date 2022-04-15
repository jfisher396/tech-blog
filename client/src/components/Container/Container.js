import React from "react";
import "./Container.css";

function Container(props) {
  
  return (
    <div className="container">
      <div>
        {props.posts.map((post, index, array) => {
          console.log(post.createdAt.slice(0,10))
          return (
            <div key={post.id} className="card">
              <header className="card-header">
                <div className="card-header-title">{post.title}</div>
              </header>
              <div className="card-content">
                <p>{post.postBody}</p>
                
              </div>
              <div className="card-footer">
                <div className="card-footer-item">
                  <p>Posted by: {array[index].user.username} on {post.createdAt.slice(0,10)} at {post.createdAt.slice(11,16)}</p>
                </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Container;

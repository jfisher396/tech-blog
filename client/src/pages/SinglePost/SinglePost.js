import React from "react";

export default function SinglePost(props) {
  return (
    <div key={props.singlePost.id}>
      <div className="block"></div>
      <p className="is-size-3 px-4">{props.singlePost.postTitle}</p>
      <div className="block"></div>
      <p className="is-size-5 px-4">{props.singlePost.postBody}</p>
      <div className="block"></div>
      <p className="is-size-5 px-4">
        Posted by: {props.singlePost.user.username}
      </p>
      <div className="block"></div>
      <p className="is-size-6 px-4">Posted on: {props.singlePost.createdAt}</p>

      {/* if there are comments then render the header, otherwise don't */}
      <div className="block"></div>
      {props.singlePost.comments.length > 0 ? (
        <h2 className="is-size-4 px-4">Comments:</h2>
      ) : null}

      {/* render comments */}
      {props.singlePost.comments.map((comment) => (
        <>
          <div className="block"></div>
          <p className="is-size-6 px-5" key={comment.id}>
            {comment.commentBody}
          </p>
          <p>{comment.user_id}</p>
        </>
      ))}
    </div>
  );
}

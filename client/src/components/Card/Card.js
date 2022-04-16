import React from "react";

function Card(props) {
  console.log(props)
  return (
    <div id={props.id} className="card">
      <header className="card-header">
        <div className="card-header-title">{props.postTitle}</div>
      </header>
      <div className="card-content">
        <p>{props.postBody}</p>
      </div>
      <div className="card-footer">
        <div className="card-footer-item">
          <p>
            Posted by: {props.postCreator} on {props.postCreatedDate} at
            {props.postCreatedTime}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;

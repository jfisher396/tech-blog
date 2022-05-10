import React from "react";
import "./Card.css"

function Card(props) {
  

  return (
    <div id={props.id} className="card">
      <header className="card-header">
        <button className="card-header-title__button" onClick={() => props.handlePostEdit(props.id)}><div className="card-header-title">{props.postTitle}</div></button>
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

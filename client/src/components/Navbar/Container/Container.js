import React from "react";
import "./Container.css"

function Container(props) {
  return (
    <div
      className="Container container-sm"
      {...props}
    ></div>
  );
}

export default Container;

import React from "react";

function Arrow({className, onClick, style}) {
  return (
    <svg
    style = {style}
    className = {className}
    onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 96 960 960"
    >
      <path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/>
    </svg>
  );
}

export default Arrow;

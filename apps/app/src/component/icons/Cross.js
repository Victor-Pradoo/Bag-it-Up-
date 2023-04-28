import React from "react";

function Cross({className, onClick, style}) {
  return (
    <svg
    style={style}
    className = {className}
    onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 96 960 960"
    >
      <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
    </svg>
  );
}

export default Cross;

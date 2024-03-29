import React from "react";

function Add({className, onClick, style}) {
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
      <path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60z"></path>
    </svg>
  );
}

export default Add;

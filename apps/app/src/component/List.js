import React from "react";

function ListIcon({className, onClick, style}) {
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
      <path d="M160 856v-60h386v60H160zm0-166v-60h640v60H160zm0-167v-60h640v60H160zm0-167v-60h640v60H160z"></path>
    </svg>
  );
}

export default ListIcon;

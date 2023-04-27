import React from "react";

function HomeIcon({style, className, id, onClick}) {
  return (
    <svg
    style={style}
    className={className}
    id={id}
    onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 96 960 960"
    >
      <path d="M220 876h150V626h220v250h150V486L480 291 220 486v390zm-60 60V456l320-240 320 240v480H530V686H430v250H160zm320-353z"></path>
    </svg>
  );
}

export default HomeIcon;
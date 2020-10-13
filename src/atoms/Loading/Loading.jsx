import React from "react";
import "./Loading.less";
import L from "react-loading";

function Loading({ color = "white" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        color: color,
      }}
    >
      <L width={18} height={18} color={color} type="spin"></L>
    </div>
  );
}

export default Loading;

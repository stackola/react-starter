import React, { useState } from "react";
import style from "./Spacer.less";

function Spacer({ w, h }) {
  let style = {
    minWidth: 0,
    minHeight: 0,
    maxHeight: 0,
    maxWidth: 0,
    width: 0,
    height: 0
  };
  if (w) {
    style.minWidth = w;
    style.maxWidth = w;
    style.width = w;
  }
  if (h) {
    style.minHeight = h;
    style.maxHeight = h;
    style.height = h;
  }
  return <div style={style}></div>;
}

//Connect to navigation, redux and export
export default Spacer;

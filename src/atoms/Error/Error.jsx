import React, { useState } from "react";
import style from "./Error.less";

function Error({ children, big }) {
  let error = children;
  if (!error) {
    error = "Something went wrong.";
  }
  return <div styleName={"Error " + (big ? "big" : "")}>{error}</div>;
}

//Connect to navigation, redux and export
export default Error;

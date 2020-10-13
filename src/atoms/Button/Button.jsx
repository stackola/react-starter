import React, { useState } from "react";
import style from "./Button.less";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import Loading from "../Loading/Loading";

function Button({ children, status = "start", onClick, outline = false }) {
  return (
    <button
      styleName={"Button" + (outline ? " outline" : " ")}
      onClick={onClick}
    >
      {status == "error" ? (
        <FaExclamationTriangle></FaExclamationTriangle>
      ) : status == "loading" ? (
        <Loading></Loading>
      ) : status == "done" ? (
        <FaCheck></FaCheck>
      ) : (
        children
      )}
    </button>
  );
}

//Connect to navigation, redux and export
export default Button;

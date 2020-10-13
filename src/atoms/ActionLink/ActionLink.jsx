import React, { useState } from "react";
import style from "./ActionLink.less";

export default function ActionLink({ onClick, children }) {
  return (
    <span styleName="ActionLink" onClick={onClick}>
      {children}
    </span>
  );
}

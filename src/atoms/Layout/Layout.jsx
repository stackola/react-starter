import React, { useState } from "react";
import "./Layout.less";

function Layout({ children, center, width = 1600, title, style = {} }) {
  return (
    <div styleName={"Layout"}>
      {title}
      <br />
      {children}
    </div>
  );
}

export default Layout;

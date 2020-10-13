import React, { useState } from "react";
import { useSelector } from "react-redux";
import useUser from "./useUser";
import { useHistory } from "react-router";

import jwt from "jsonwebtoken";

export default function useAuthedOnly({ authed, notAuthed }) {
  let user = useUser();
  let history = useHistory();
  if (user && user.token) {
    //validate token with server.
    let decoded = jwt.decode(user.token);
    let tokenTime = decoded.exp - Date.now() / 1000;
    if (tokenTime > 0) {
      //token is valid.
      if (authed) {
        authed();
      }
    } else {
      //token invalud..
      if (notAuthed) {
        notAuthed();
      } else {
        //redirect to /loing per default.
        history.push("/login");
      }
    }
  } else {
    if (notAuthed) {
      notAuthed();
    } else {
      //redirect to /loing per default.
      history.push("/login");
    }
  }
}

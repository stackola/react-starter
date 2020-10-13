import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function useUser() {
  let user = useSelector((s) => s.user);
  return user;
}

import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(_session_key) ? true : false;

  if (isSession && isLogin) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return null;
};

export default Permit;

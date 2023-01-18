import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoutes = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    if (userData === null) {
      navigate("/login");
    }
  });
  return (
    <div>
      {/* <h1>hy rohit </h1> */}
      <Component />
    </div>
  );
};

export default ProtectRoutes;

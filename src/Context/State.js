import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DataS from "./UseContext";

const State = (props) => {
  const [Student, setStudent] = useState([]);
  useEffect(() => {
    axios
      .get("https://6391e7c1ac688bbe4c56457d.mockapi.io/students")
      .then((res) => setStudent(res.data));
  }, []);
  return <DataS.Provider value={Student}>{props.children}</DataS.Provider>;
};

export default State;

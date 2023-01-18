import React from "react";
// import { UserForm } from "./userForm";
import axios from "axios";
import react, { useState, useEffect } from "react";
// import Form from "../Form/form";
import { useNavigate } from "react-router-dom";
import UploardData from "./UploardData";

const EditData = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null,
    name: null,
    email: null,
    contact: null,
    password: null,
    s_img: null,
    balance: null,
  });

  //   userName, Age, E_Mail, Password, check;

  const onchangeHandler = (name, value) => {
    let userData = { ...user };
    userData[name] = value;
    setUser(userData);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://6391e7c1ac688bbe4c56457d.mockapi.io/students/${user.id}`,
        user
      )
      .then((response) => {
        console.log(response.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editToData = () => {
    navigate(-1);
  };
  return (
    <UploardData
      isEdit={true}
      user={user}
      onchangeHandler={onchangeHandler}
      handleSubmit={handleSubmit}
      editToData={editToData}
    />
  );
};
export default EditData;

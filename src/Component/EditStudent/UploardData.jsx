import { Button, ButtonBase, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploardData = () => {
  const navigate = useNavigate();
  let updateStudent = JSON.parse(localStorage.getItem("updateStudent"));
  let [users, setUsers] = useState({
    name: `${updateStudent.name}`,
    email: `${updateStudent.email}`,
    password: `${updateStudent.password}`,
    contact: `${updateStudent.contact}`,
    balance: `${updateStudent.balance}`,
    s_img: `${updateStudent.s_img}`,
  });
  const changeHandlerSTD = (e) => {
    let data2 = { ...users };
    let keyName = e.target.name;
    data2[keyName] = e.target.value;
    setUsers(data2);
  };
  function submitHandlerSTD(e) {
    e.preventDefault();
    axios
      .put(
        `https://6391e7c1ac688bbe4c56457d.mockapi.io/students/${updateStudent.id}`,
        users
      )
      .then((e) => console.log(e.data))
      .catch((e) => console.log(e));
    navigate("/student");
  }
  return (
    <div>
      <form>
        <div className="FourRow">
          <TextField
            autoComplete="given-name"
            name="name"
            required
            id="firstName"
            label="Student Name"
            autoFocus
            margin="normal"
            type="text"
            value={users.name}
            onChange={(e) => changeHandlerSTD(e)}
          ></TextField>
          <TextField
            autoComplete="email"
            name="email"
            margin="normal"
            required
            id="email"
            type="email"
            label="Student E-Mail"
            value={users.email}
            onChange={(e) => changeHandlerSTD(e)}
            autoFocus
          ></TextField>
          <TextField
            autoComplete="contact"
            name="contact"
            margin="normal"
            required
            id="contact"
            label="Student Contact"
            value={users.contact}
            onChange={(e) => changeHandlerSTD(e)}
            autoFocus
          ></TextField>
        </div>
        <div className="FourRow">
          <TextField
            autoComplete="password"
            name="password"
            type="password"
            margin="normal"
            required
            id="password"
            label="Student password"
            // value={StudentsData.password}
            value={users.password}
            onChange={(e) => changeHandlerSTD(e)}
            autoFocus
          ></TextField>

          <TextField
            autoComplete="Balance"
            name="balance"
            type="Balance"
            margin="normal"
            required
            id="Balance"
            label="Student Balance"
            value={users.balance}
            onChange={(e) => changeHandlerSTD(e)}
            autoFocus
          ></TextField>
          <Button id="imgUpload" variant="contained" component="label">
            {" "}
            Upload File{" "}
            <input
              type="file"
              hidden
              // value={StudentsData.balance}
              //   onChange={(e) => {
              //     setFileChange(e.target.value);
              //   }}
            />{" "}
          </Button>
        </div>
        <div className="submitBtn">
          <Button
            className="subData"
            variant="contained"
            size="large"
            type="submit"
            onClick={(e) => {
              submitHandlerSTD(e);
            }}
          >
            Submit Data
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploardData;

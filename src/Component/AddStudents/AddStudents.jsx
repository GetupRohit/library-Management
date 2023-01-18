import { Button, IconButton, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AddStudents.css";

const AddStudents = () => {
  const [studentsAdd, setStudentsAdd] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [emailChange, setEmailChange] = useState("");
  const [contactChange, setContactChange] = useState("");
  const [passwordChange, setPasswordChange] = useState(0);
  const [balanceChange, setBalanceChange] = useState(0);
  const [fileChange, setFileChange] = useState("");


  const handleSubmitF = (e) => {
    e.preventDefault();

    const data = {
      name: studentName,
      email: emailChange,
      contact: contactChange,
      password: passwordChange,
      s_img: fileChange,
      balance: balanceChange,
      id: "2",
    };
    axios
      .post("https://6391e7c1ac688bbe4c56457d.mockapi.io/students", data)
      .then((res) => setStudentsAdd(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmitF}>
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
            // value={users.name}
            onChange={(e) => setStudentName(e.target.value)}
          ></TextField>
          <TextField
            autoComplete="email"
            name="email"
            margin="normal"
            required
            id="email"
            type="email"
            label="Student E-Mail"
            // value={users.email}
            onChange={(e) => setEmailChange(e.target.value)}
            autoFocus
          ></TextField>
          <TextField
            autoComplete="contact"
            name="contact"
            margin="normal"
            required
            id="contact"
            label="Student Contact"
            // value={users.contact}
            onChange={(e) => setContactChange(e.target.value)}
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
            // value={users.password}
            onChange={(e) => setPasswordChange(e.target.value)}
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
            // value={users.balance}
            onChange={(e) => setBalanceChange(e.target.value)}
            autoFocus
          ></TextField>
          <Button id="imgUpload" variant="contained" component="label">
            {" "}
            Upload File{" "}
            <input
              type="file"
              hidden
              // value={StudentsData.balance}
              onChange={(e) => {
                setFileChange(e.target.value);
              }}
            />{" "}
          </Button>
        </div>
        <div className="submitBtn">
          <Button
            className="subData"
            variant="contained"
            size="large"
            type="submit"
          >
            Submit Data
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudents;

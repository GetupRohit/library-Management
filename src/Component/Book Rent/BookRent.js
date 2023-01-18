import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./BookRent.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
const BookRent = () => {
  const [bDataDelete, setBDataDelete] = useState([]);
  useEffect(() => {
    getBookRent();
  }, []);
  const getBookRent = () => {
    axios
      .get("https://6391e7c1ac688bbe4c56457d.mockapi.io/student_books")
      .then((res) => setBDataDelete(res.data));
  };
  const deleteData = (StudentData) => {
    toast.success("Book remove from the list", {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    axios
      .delete(
        `https://6391e7c1ac688bbe4c56457d.mockapi.io/student_books/${StudentData}`
      )
      .then((response) => {
        console.log(response.data);
        setBDataDelete(
          bDataDelete.filter((item) => item.id !== response.data.id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="boxCart">
      <Table size="small">
        <TableHead>
          <TableRow className="heading">
            <TableCell scope="col">Date</TableCell>
            <TableCell scope="col">Student Name</TableCell>
            <TableCell scope="col">Book Name</TableCell>
            <TableCell scope="col">Returning Status</TableCell>
            <TableCell scope="col">Quantity Purchase</TableCell>
            <TableCell scope="col">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bDataDelete.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell colSpan="1">{item.date}</TableCell>
                <TableCell>{item.s_name}</TableCell>
                <TableCell>{item.b_name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <div className="btnR">
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        deleteData(item.id);
                      }}
                    >
                      Delete
                      <ToastContainer />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookRent;

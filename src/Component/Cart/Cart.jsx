import React, { useMemo } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import "./Cart.css";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const userData = JSON.parse(localStorage.getItem("currentUser"));
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    BooksData();
    studentsData();
    CartsData();
  }, []);
  const BooksData = () => {
    axios
      .get("https://6391e7c1ac688bbe4c56457d.mockapi.io/books")
      .then((res) => setBooks(res.data));
  };
  const studentsData = () => {
    axios
      .get("https://6391e7c1ac688bbe4c56457d.mockapi.io/students")
      .then((res) => setStudents(res.data));
  };
  const CartsData = () => {
    axios
      .get("https://6391e7c1ac688bbe4c56457d.mockapi.io/cart")
      .then((res) => {
        setCarts(res.data.filter((cart) => cart.student_id == userData.id));
      });
  };

  const recordsData = useMemo(() => {
    return carts.map((cart) => {
      let newCart = { ...cart };
      newCart["studentName"] = students?.find(
        (stud) => stud.id == newCart.student_id
      )?.name;
      newCart["bookName"] = books?.find(
        (bk) => bk.b_code == newCart.b_code
      )?.name;
      return newCart;
    });
  }, [carts, students, books]);

  const postData = (item, e) => {
    toast.success("Your Parchase this Book", {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    var item = item;
    const obj = {
      s_name: userData.name,
      b_name: item.b_name,
      status: "Purchased",
      quantity: quantity,
    };
    axios
      .post("https://6391e7c1ac688bbe4c56457d.mockapi.io/student_books", obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    axios
      .delete(`https://6391e7c1ac688bbe4c56457d.mockapi.io/cart/${item.id}`)
      .then((response) => {
        console.log(response.data);
        setCarts(carts.filter((item) => item.id !== response.data.id));
      });

    if (item.b_name == books.b_code) {
      // console.log(books);
      console.log("code will work");
    }
    let CurrentQuantity = parseInt(books.quantity);
    setBooks.quantity = parseInt(CurrentQuantity - 1);
  };
  const deleteData = (cartData) => {
    toast.success("Your Item Remove From Cart", {
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
      .delete(`https://6391e7c1ac688bbe4c56457d.mockapi.io/cart/${cartData}`)
      .then((response) => {
        console.log(response.data);
        setCarts(carts.filter((item) => item.id !== response.data.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="boxCart">
      <React.Fragment>
        <h1>RECENT CART</h1>
        <Table size="small">
          <TableHead>
            <TableRow>
              {/* <TableCell>Student ID</TableCell> */}
              <TableCell>Student Name</TableCell>
              {/* <TableCell>Book Code</TableCell> */}
              <TableCell>Book Name</TableCell>
              <TableCell>Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordsData.map((item, index) => (
              <TableRow key={index}>
                {/* <TableCell>{item.student_id}</TableCell> */}
                <TableCell>{item.studentName}</TableCell>
                {/* <TableCell>{item.b_name}</TableCell> */}
                <TableCell>{item.bookName}</TableCell>
                <TableCell>
                  <div className="Cart_btn">
                    <Button
                      className="Cart_btn"
                      variant="outlined"
                      onClick={(e) => {
                        postData(item);
                      }}
                    >
                      Order Item
                    </Button>
                    <Button
                      className="Cart_btn"
                      variant="outlined"
                      onClick={(e) => {
                        deleteData(item.id);
                      }}
                    >
                      Remove Item
                    </Button>
                    <ToastContainer />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </div>
  );
};

export default Cart;

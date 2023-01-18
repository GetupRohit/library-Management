import axios from "axios";
import * as React from "react";
import "./Books.css";
import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
const Books = () => {
  const [bookData, setbookData] = useState([]);
  const userData = JSON.parse(localStorage.getItem("currentUser"));
  const userBalc = JSON.parse(localStorage.getItem("currentBal"));
  useEffect(() => {
    booksData();
  }, []);

  const booksData = () => {
    axios
      .get("https://6391e7c1ac688bbe4c56457d.mockapi.io/books")
      .then((res) => setbookData(res.data));
  };

  const postData = (item, e) => {
    if (item.price < userData.balance) {
      toast.success("Your item Add to Cart", {
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
        student_id: userData.id,
        b_code: item.b_code,
      };
      axios
        .post("https://6391e7c1ac688bbe4c56457d.mockapi.io/cart", obj)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      userData.balance = userData.balance - item.price;
      localStorage.setItem("currentBal", JSON.stringify(userData.balance));

      console.log(userData.balance);
    } else {
      toast.warning("You don't have enught money", {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="boxCart">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Book Picture</TableCell>
            <TableCell>Book Code</TableCell>
            <TableCell>Book Name</TableCell>
            <TableCell>Book Author</TableCell>
            <TableCell>Book Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookData.map((item, index) => {
            const { b_code, name, author, quantity, b_img } = item;
            return (
              <TableRow key={index}>
                <TableCell>
                  {" "}
                  <img
                    src={b_img}
                    class="card-img-top"
                    id="img_cart"
                    alt="..."
                  />
                </TableCell>
                <TableCell>{b_code}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{author}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={(e) => {
                      postData(item);
                    }}
                  >
                    Cart Item
                  </Button>
                  <ToastContainer />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default Books;

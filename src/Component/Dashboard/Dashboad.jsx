import React from "react";
import "./Dashboad.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Dashboad = () => {
  const [balance, setBal] = useState(0);
  const userData = JSON.parse(localStorage.getItem("currentUser"));
  const userBalc = JSON.parse(localStorage.getItem("currentBal"));
  const [myData, setMyData] = useState([]);
  const [myErr, setMyErr] = useState("");
  useEffect(() => {
    booksData();
  }, []);

  const booksData = () => {
    axios
      .get("https://6391e7c1ac688bbe4c56457d.mockapi.io/books")
      .then((res) => setMyData(res.data))
      .catch((err) => setMyErr(err.message));
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
        // s_name: userData.name,
        // b_code: item.name,
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
    <div className="deshboad">
      <div className="containerd">
        <div className="left">
          <div>
            <img className="img" src="" alt="user" />
          </div>
          <div className="name">{userData.name}</div>
          <div className="email">{userData.email}</div>
          <div className="history"></div>
          <div className="balance">
            <div className="amount">$ {userBalc}</div>
            <div className="bal">Balance</div>
          </div>
        </div>

        <div className="right">
          <Table size="small" id="TableCart">
            <TableHead>
              <TableRow>
                <TableCell>Book Picture</TableCell>
                <TableCell>Book Name</TableCell>
                <TableCell>Book Name</TableCell>
                <TableCell>Add to Cart</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myData.map((item, index) => {
                const { b_img, name, author } = item;
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        className="b_img"
                        src={b_img}
                        alt="img"
                        id="img_cart"
                      />
                    </TableCell>
                    <TableCell className="b_name">{name}</TableCell>
                    <TableCell className="a_name">{author}</TableCell>
                    <TableCell className="add_btn">
                      <Button
                        className="add"
                        onClick={(e) => {
                          postData(item);
                        }}
                        variant="outlined"
                      >
                        +
                      </Button>
                      <ToastContainer />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboad;

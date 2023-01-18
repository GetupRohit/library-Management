import React, { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import axios from "axios";

const AddBooks = () => {
  const [booksAdd, setBooksAdd] = useState([]);
  // console.log(booksAdd);
  const [b_code, setB_code] = useState(0);
  const [nameChange, setNameChange] = useState("");
  const [autherChange, setAutherChange] = useState("");
  const [quantityChange, setQuantityChange] = useState(0);
  const [fileChange, setFileChange] = useState("");
  const [priceChange, setPriceChange] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      b_code: b_code,
      name: nameChange,
      author: autherChange,
      quantity: quantityChange,
      b_img: fileChange,
      price: priceChange,
      id: "2",
    };
    axios
      .post("https://6391e7c1ac688bbe4c56457d.mockapi.io/books", data)
      .then((res) => setBooksAdd(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="FourRow">
          <TextField
            autoComplete="given-number"
            name="b_code"
            required
            id="b_code"
            label="Book Code"
            autoFocus
            margin="normal"
            type="number"
            onChange={(e) => {
              setB_code(e.target.value);
            }}
          ></TextField>
          <TextField
            autoComplete="name"
            name="name"
            margin="normal"
            required
            id="bookName"
            type="text"
            label="Book Name"
            onChange={(e) => {
              setNameChange(e.target.value);
            }}
            autoFocus
          ></TextField>
          <TextField
            autoComplete="name"
            name="auther"
            margin="normal"
            required
            id="auther"
            type="text"
            label="Book Auther"
            onChange={(e) => {
              setAutherChange(e.target.value);
            }}
            autoFocus
          ></TextField>
        </div>
        <div className="FourRow">
          <TextField
            autoComplete="number"
            name="quantity"
            type="number"
            margin="normal"
            required
            id="quantity"
            label="Book Quantity"
            onChange={(e) => {
              setQuantityChange(e.target.value);
            }}
            autoFocus
          ></TextField>

          <TextField
            autoComplete="price"
            name="price"
            type="number"
            margin="normal"
            required
            id="price"
            label="Book Price"
            onChange={(e) => {
              setPriceChange(e.target.value);
            }}
            autoFocus
          ></TextField>
          <Button id="imgUpload" variant="contained" component="label">
            {" "}
            Upload File{" "}
            <input
              type="file"
              hidden
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

export default AddBooks;

import React from "react";
import Login from "../Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Nav from "../NavBar/NavBar";
import Dashboad from "../Dashboard/Dashboad";
import Students from "../Students/Students";
import Books from "../Books/Books";
import BookRent from "../Book Rent/BookRent";
import axios from "axios";
import { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Dashboard from "../Dashboard/AddminDashboard";
import EditData from "../EditStudent/EditStudents";
import AddStudents from "../AddStudents/AddStudents";
import WrongPath from "../WrongPath/WrongPath";
import ProtectRoutes from "../ProtectRoutes/ProtectRoutes";
import UploardData from "../EditStudent/UploardData";

const HomePage = () => {
  const [students, setStudent] = useState([]);
  useEffect(() => {
    studentsData();
  }, []);
  const studentsData = () => {
    axios
      .get("https://6391e7c1ac688bbe4c56457d.mockapi.io/students")
      .then((res) => setStudent(res.data));
  };
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <React.Fragment>
            <Route
              exact
              path="/Student"
              element={<ProtectRoutes Component={Students} />}
            />
            <Route
              exact
              path="/"
              element={<ProtectRoutes Component={Dashboad} />}
            />
            <Route
              exact
              path="/book"
              element={<ProtectRoutes Component={Books} />}
            />
            <Route
              exact
              path="/bookRent"
              element={<ProtectRoutes Component={BookRent} />}
            />
            <Route
              exact
              path="/cart"
              element={<ProtectRoutes Component={Cart} />}
            />
            <Route
              exact
              path="/AdMin"
              element={<ProtectRoutes Component={Dashboard} />}
            />
            <Route path="/users/:id/edit" element={<UploardData />} />
            <Route path="*" element={<WrongPath />} />
          </React.Fragment>
        </Routes>
      </Router>
    </div>
  );
};

export default HomePage;

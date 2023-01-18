import React from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light" id="Nav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Library-Manage
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item" id="studentss">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/student"
                >
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/book">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookRent">
                  Book Renting
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AdMin">
                  Admin
                </Link>
              </li>
            </ul>
            <div className="button">
              <p className="btnText">LOGOUT?</p>
              <div className="btnTwo">
                <p className="btnText2" onClick={logOut}>
                  GO!
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;

import React, { useContext } from "react";
import { Input, TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "./Login.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Dashboad from "../Dashboard/Dashboad";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [students, setStudent] = useState([]);
  const [wrong, setWrong] = useState("");
  useEffect(() => {
    studentsData();
  }, []);

  const studentsData = () => {
    axios
      .get("https://6391e7c1ac688bbe4c56457d.mockapi.io/students")
      .then((res) => setStudent(res.data));
  };

  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const getPswrd = (e) => {
    setPassword(e.target.value);
  };
  const logIn = () => {
    students.map((item) => {
      if (item.email === Email && item.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(item));
        navigate("/");
      }
    });
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    if (userData == null) {
      navigate("/login");
    }
  });
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                getEmail(e);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                getPswrd(e);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => logIn()}
              id="btn"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <a href="#" variant="body2">
                  Forgot password?
                </a>
              </Grid>
              <Grid item>
                <a href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </a>
              </Grid>
            </Grid>
            ;
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

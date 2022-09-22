import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {
  Grid,
  TextField,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserHeader() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      neutral: {
        main: "#ffffff",
        contrastText: "#fff",
      },
    },
  });
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="white">
        <Container fluid>
          <Navbar.Brand href="#" className="navName">
            BUSSINESS INCUBATOR
          </Navbar.Brand>
          <Navbar.Brand href="">
            <Link className="navName" id="navSub" to="/status">
              {" "}
              Status
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <ThemeProvider theme={theme}>
              <Button
                onClick={logOut}
                className="button"
                variant="outlined"
                color="neutral"
              >
                Logout
              </Button>
            </ThemeProvider>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default UserHeader;

import Container from "react-bootstrap/Container";
import "./login.css";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // console.log("valuesssssssss"+values.email);
    onSubmit: async (values) => {
      // event.preventDefault();
      console.log("valuessssssss" + values);
      const data = await axios.post(
        "http://localhost:3001/users/login",
        values
        // method: "POST",
        // headers: {
        //   "Content-type": "application/json",
        // },
        // body: JSON.stringify({
        //   initialValues
        //   // initialValues
      );
      // });
      // const data = await response.json();
      console.log(data);
      if (data.data.created) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      }

      if (data.data) {
        console.log("k");
        if (data.data.errors) {
          console.log("khjhbg");
          const { email, password } = data.data.errors;
          if (email) {
            generateError(email);
          } else if (password) {
            generateError(password);
          }
        } else {
          console.log("homeeee");
          navigate("/home");
        }
      }
    },

    validate: (values) => {
      console.log("valuesssszzzzzzzzzz" + values.email);
      let errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          values.email
        )
      ) {
        errors.email = "Invalid email format";
      }
      if (!values.password) {
        errors.password = "password is required";
      }
      return errors;
    },
  });

  // console.log(initialValues);
  useEffect(() => {
    const userInfo = localStorage.getItem("token");
    if (userInfo) {
      navigate("/home");
      // const tokenExist = jwtDecode(userInfo)
      // console.log(tokenExist,"token");
    }
  }, []);
  const navigate = useNavigate();
  // const [email,setEmail] = useState('')
  // const [password,setPassword] = useState('')

  const generateError = (error) => {
    console.log("jvvh");
    console.log(error);
    toast.error(error, {
      position: "bottom-right",
    });
  };

  // const loginUser =

  return (
    <div className="body">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            {/* <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '} */}
            <Link to="/" className="homelink">
              BUSSINESS INCUBATOR
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="login">
        <Container>
          <h3>Log In</h3>
          <form className="form" onSubmit={formik.handleSubmit}>
            <div>
              <input
                id="email"
                className="input"
                value={formik.values.email}
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <div className="errormsg">{formik.errors.email}</div>
              ) : null}
            </div>
            <br />
            <br />
            <div>
              <input
                id="password"
                className="input"
                value={formik.values.password}
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <div className="errormsg">{formik.errors.password}</div>
              ) : null}
            </div>
            <br />
            <br />
            <input type="submit" value="Login" className="button" />
          </form>
          <div className="mt-3 ">
            New Customer ?{" "}
            <Link to="/signup" className="decor">
              Register Here
            </Link>
          </div>
          <ToastContainer />
        </Container>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { Container, Table , Button} from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'
import {useEffect,useState} from 'react'
import './adminpanel.css'
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";

function Adminpanel() {

    const Navigate = useNavigate()
    useEffect(()=>{
        const auth=localStorage.getItem("token")
        if(!auth){
         Navigate("/adminlogin")
        }
      })
    const logOut = ()=>{
        localStorage.clear()
        Navigate('/adminlogin')
    }
  const info = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const config = {
    headers : {
      "Content-Type" : "application/json"
    }
  }

const appData = async() => {
    let appData = await axios.get(`http://localhost:3001/admin/adminpanel`)
    console.log('appdata',appData.data);

        if(appData.data.status==false){

        }else{
          setData(appData.data)
        }
  }

  useEffect(()=>{
    appData()
  }, [])
  console.log('lenghtttt',data.length);
  return (
    <>
     <Navbar  expand="lg" bg="dark"  variant="white">
      <Container fluid>
        <Navbar.Brand  href="#" className='panelHead' >Admin panel</Navbar.Brand>
        <Navbar.Brand  href="#"><Link to='/manageRequest' className='panelHeadSub' >Manage request</Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
          </Nav>
          <Button onClick={logOut} variant="outline-danger">Logout</Button>
          
        
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
    <div style={{ marginTop: "2%", textAlign: "center" }}>
      
      <Container>
        <h1>New Applications</h1>
        {data.length<1 ? (
        <div>
          <h3 style={{color:"red"}}>Currently no new applications</h3>
        </div>): (
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Application ID</th>
              <th>Company Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((obj,index) => {
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{obj._id}</td>
                  <td>{obj.companyName}</td>
                  <td style={{ color: "green" }}>{obj.status}</td>
                  <td>
                    <p
                      className="view"
                      style={{ color: "black", textAlign: "center" }}
                      onClick={() => {
                        navigate("/viewApplication");
                        localStorage.setItem(
                          "appId",
                          JSON.stringify([obj._id])
                        );
                      }}
                    >
                      View Application
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        ) }
  
      </Container>
    </div>
    </>
  );
}

export default Adminpanel;
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Container} from "react-bootstrap";
import { SuccessMessage } from "../../components/Errormsg/errormsg";
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'


function ViewApp() {
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
  const [app, setApp] = useState({});
  const [confirmation, setConfimration] = useState('')
  const id = JSON.parse(localStorage.getItem("appId"));
  console.log('id',id);
const viewApplication = async () => {
    let appDetails = await axios.get(`http://localhost:3001/admin/viewApplication/${id[0]}`);
    setApp(appDetails.data);
    console.log(app)
  }

  useEffect(()=>{viewApplication()}, []);

  return (
    <>
     <Navbar  expand="lg" bg="dark"  variant="white">
      <Container fluid>
        <Navbar.Brand  href="#"><Link to='/adminpanel'  className='panelHead' >Admin panel</Link></Navbar.Brand>
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
    <div style={{marginTop:'3%'}}>
      <div className="d-flex justify-content-around">
        <Container>
          <Card style={{ width: "100%" ,backgroundColor:'#f7f7f7'}}>
            <Card.Body>
              <div className="row">
                <div className="col-md-3">
                  <Card.Title>Company Name:</Card.Title>
                  <Card.Text>
                    {app.companyName}
                  </Card.Text>
                </div>
                <div className="col-md-3">
                  <Card.Title>Address:</Card.Title>
                  <Card.Text>
                  {app.address}
                  </Card.Text>
                </div>
                <div className="col-md-3">
                  <Card.Title>City:</Card.Title>
                  <Card.Text>
                  {app.city}
                  </Card.Text>
                </div>
                <div className="col-md-3">
                  <Card.Title>State:</Card.Title>
                  <Card.Text>
                  {app.state}
                  </Card.Text>
                </div>
              </div>
              <br></br>
              <div style={{textAlign:"center"}}>
              {/* <h2> Description</h2> */}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Card.Title>Team and Backgorund:</Card.Title>
                  <Card.Text>
                    {app.team}
                  </Card.Text>
                </div>
                <div className="col-md-6">
                  <Card.Title>Company and products:</Card.Title>
                  <Card.Text>
                  {app.product}
                  </Card.Text>
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-md-6">
                  <Card.Title>Solution and uniqueness:</Card.Title>
                  <Card.Text>
                  {app.solution}
                  </Card.Text>
                </div>
                <div className="col-md-6">
                  <Card.Title>Value Propostions:</Card.Title>
                  <Card.Text>
                  {app.proposition}
                  </Card.Text>
                </div>
              </div>
              <br></br>
              <div className="row">
              <div className="col-md-6" style={{}}>
                <Card.Title>Incubation Type:</Card.Title>
                <Card.Text>{app.type}</Card.Text>
              </div>
              {app.slotCode!=="null" ? (
                <div className="col-md-6" style={{}}>
                  <Card.Title>Slot Code:</Card.Title>
                  <Card.Text>{app.slotCode}</Card.Text>
                </div>
              ) : (
                " "
              )}
              </div>
              <br></br>
              {app.bookingStat ? (<div>
                <Button variant="primary" onClick={async()=>{
                const response = await axios.get(`http://localhost:3001/admin/cancelSlot/${id[0]}`)
                console.log('resposne.fafaewra',response.data); 
              }
              }>Cancel Slot</Button>
              </div>) :(
                <div>
                <Button variant="primary" onClick={async()=>{
                const response = await axios.patch(`http://localhost:3001/admin/updateNewAppStatus/${id[0]}`)
                const stat = response.data
                setConfimration('Status updated')
              }
              }>Processing</Button>
              <Button variant="primary" style={{marginLeft:'1%',width:'100px'}} onClick={async()=>{
                const response = await axios.patch(`http://localhost:3001/admin/approveNewAppStatus/${id[0]}`)
                setConfimration('Status updated')
              }}>Approve</Button>
              <Button style={{marginLeft:'1%',width:'100px'}} onClick={async()=>{
                const response = await axios.patch(`http://localhost:3001/admin/rejectNewAppStatus/${id[0]}`)
                setConfimration('Status updated')
              }}>Reject</Button>
                </div>  
              )}
            </Card.Body>
          </Card>
          <br></br>
          {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "}
        </Container>
      </div>
    </div>
    </>
  );
}

export default ViewApp;

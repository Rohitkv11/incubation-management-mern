import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './landingpage.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import {UndrawTabs, UndrawDesigner,UndrawResponsive } from 'react-undraw-illustrations';


function Landingpage() {
  const Navigate = useNavigate()
  React.useEffect(()=>{
    const auth = localStorage.getItem("token")
    if(auth){
      Navigate("/home")
    }
  })
  return (

    <div>
      <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">BUSSINESS INCUBATOR</Navbar.Brand>
        
       
         
          <Nav>
            <Nav.Link href="#deets"><Link className='link' to='/signup' >Sign up</Link></Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
            <Link className='link' to='/login'>Log in</Link> 
            </Nav.Link>
          </Nav>
     
      </Container>
    </Navbar>
    </div>
    <div className='landingArea'>
    <Card className="bg-light text-dark">
      <Card.Img className='image'  src="https://cdn.dribbble.com/users/1568450/screenshots/5709863/teamwork_white_1_dribbble-01-01_4x.png" alt="Card image" />
      <Card.ImgOverlay>
        <Container className='mt-5'>
        <Card.Title><h2>Build New Bussiness Ideas</h2></Card.Title>
        <Card.Text>
         Facilitating Incubators to promote Innovation and create a new wave of Budding Entrepreneurship
        </Card.Text>
        </Container>
        <Card.Text></Card.Text>
      </Card.ImgOverlay>
    </Card>
    </div>
  


   
  


      </div>
  )
}

export default Landingpage
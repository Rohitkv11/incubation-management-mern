import Container from 'react-bootstrap/Container';
import './adminlogin.css'
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Adminlogin = () => {
  useEffect(() => {
    const userInfo= localStorage.getItem('token')
      if (userInfo) {
          navigate("");
        }
      }, []);
  const navigate = useNavigate();
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
  
const generateError = (error)=>{
  console.log("jvvh");
  console.log(error);
  toast.error(error,{
    position:"bottom-right",
  })
}

const loginAdmin = async (event)=>{
  event.preventDefault()
const response = await fetch('http://localhost:3001/admin/login',{
  method:"POST",
  headers:{
    'Content-type':'application/json',
  },
    body:JSON.stringify({
      email,
      password
    }),
  })
  const data = await response.json()
  if(data.created){
    localStorage.setItem('token',data.token)
  }

  if(data){
    console.log("k");
    if(data.errors){
      console.log("khjhbg");
      const{email,password}=data.errors;
      if(email){
 
       
        generateError(email)
      }
      else if(password){
        generateError(password)
      }
      
    }else{
      console.log("homeeee");
      navigate('/adminpanel')
    }
  }
}

  return (
    <div className='body'>
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
       Admin Login
      </Navbar.Brand>
    </Container>
  </Navbar>
  <div className='login' >
    <Container>
  <h3>Admin Login</h3>
  <form onSubmit={loginAdmin} className='form'>
    <input className='input' value={email} type="email" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} /><br/><br/>
    <input className='input' value={password} type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} /><br/><br/>
    <input type="submit" value='Login' className='button' />

  </form>
  <ToastContainer/>
  </Container>
  </div>
  </div>
  );
}

export default Adminlogin;

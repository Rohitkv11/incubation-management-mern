import Container from 'react-bootstrap/Container';
import './signup.css'
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const Navigate = useNavigate()
const [name,setname] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [cpassword,setCpassword] = useState('')
const generateError = (err)=>
  toast.error(err,{
    position:"bottom-right",
  })

const registerUser = async (event)=>{
  event.preventDefault()
const response = await fetch('http://localhost:3001/users/signup',{
  method:"POST",
  headers:{
    'Content-type':'application/json',
  },
    body:JSON.stringify({
      name,
      email,
      password,
    }),
  })
    const data = await response.json()
 
  if(data){
    if(data.errors){
      const{email,password}=data.errors;
      if(email) generateError(email)
      else if (password) generateError(password)
    
    }
    else{
      Navigate('/login')
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
     <Link className='homelink' to='/'>BUSSINESS INCUBATOR</Link>   
      </Navbar.Brand>
    </Container>
  </Navbar>
  <div className='signup' >
    <Container>
  <h3>Create An Account</h3>
  <form onSubmit={registerUser} className='form'>
    <input className='input' value={name} type="text" placeholder=' Name' onChange={(e)=>{setname(e.target.value)}} /><br/><br/>
    <input className='input' value={email} type="email" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} /><br/><br/>
    <input className='input' value={password} type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} /><br/><br/>
    <input className='input' value={cpassword} type="password" placeholder='Confirm Password' onChange={(e)=>{setCpassword(e.target.value)}} /><br/><br/>
    <input type="submit" value='Register' className='button' />

  </form>
  <div className='mt-3' >
  Already have an account ? <Link to="/login" className='decor' >Login Here</Link>
  </div>
  <ToastContainer />
  </Container>
  </div>
  </div>
  );
}

export default Signup;

import React from "react";
import { Alert } from "react-bootstrap";
// import {} from '@material-ui/core';


const ErrorMessage = ({ variant = "", children }) => {
  return (
    
      <Alert variant={variant} style={{ fontSize: 15,textAlign:"center" }}>
      <strong>{children}</strong>
    </Alert>
    
    
  );
};
const SuccessMessage = ({ variant = "", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 15 ,textAlign:"center" }}>
      <strong>{children}</strong>
    </Alert>
  );
};


export {ErrorMessage,SuccessMessage};
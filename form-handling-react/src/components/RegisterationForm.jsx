import React from 'react'
import { useState } from 'react'

function RegisterationForm(){

 const [formData, setFormData] = useState({
  username:"",
  email:"",
  password:"",
 });


  // Corrected: Renamed 'errors' state to 'error' for singular error message
  const [error, setError] = useState(""); 

  const handleChange = (e) => {
  const { name, value } = e.target;

  // 1. Clear error message when user starts typing again
  setError(""); 

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
 };

 const handleSubmit =(e) => {
  e.preventDefault(); // Prevents the default form submission (page reload)

  // Simple validation check
  if (!formData.username || !formData.email || !formData.password){
    setError("All fields are required.")
    return; // Stop the submission process
  }
  
  // If validation passes
  setError("");
  console.log("Form Submitted:", formData);

  // Reset the form fields
  setFormData({
    username:"",
    email:"",
    password:""
  });
 };



  return(
  <>
    {/* CRITICAL FIX: Attach handleSubmit to the form's onSubmit event */}
    <form onSubmit={handleSubmit}> 
    
     {/* Display the error message if it exists */}
     {error && <p style={{ color: 'red' }}>{error}</p>}

     <input 
            type="text"
            value={formData.username}
            onChange={handleChange}
            name="username"
            placeholder="Username" /> {/* Changed to Title Case */}

     {/* Added 'name' attribute to the email input */}
     <input 
       name="email"
       type="email"
       placeholder="Johndoe@email.com"
       value={formData.email}
       onChange={handleChange}
       />
     <input
       name="password"
       type="password"
       value={formData.password}
       onChange={handleChange}
       placeholder="Password" /> {/* Changed to Title Case */}
     
     <button type="submit">Register</button> {/* Changed button text */}

     </form>
  </>
  );
};

export default RegisterationForm;
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TodoContext from '../context/todos/TodoContext';


const Signup = (props) => {
  const { host } = useContext(TodoContext)
  const [credentials, setCredentials] = useState({fullname: "", email: "", password: "", cpassword: ""});
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
      e.preventDefault();
      if(credentials.password !== credentials.cpassword){
        return props.showAlert("warning", "Confirm Your Password Correctly");
      }
      //API call
      const response = await fetch(`${host}/api/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: credentials.fullname, email: credentials.email, password: credentials.password})
      });

      const json = await response.json();

      if(json.success){
        //redirect
        props.showAlert("success", "Account Created Successfully!");
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('todolist_username', json.username);
        navigate("/todos");
      }
      else{
        props.showAlert("error", json.error);
      }
  }

  const handleChange = (e)=>{
     setCredentials({...credentials, [e.target.id]: e.target.value});
  }

  return (
    <div className='container signupForm'>
        <form className="Form" onSubmit={handleSubmit}>
          <div className="divImage"><img className="authImage" src="/cloudNotesIcon.png" alt="icon" /></div>
        <h2 className="heading">Sign up</h2>
        <div className="mb-3">
            <input type="text" className="form-control authForm" value={credentials.name} name="fullname" id="fullname" aria-describedby="fullname" onChange={handleChange} minLength={2} required placeholder='Full Name'/>
        </div>
        <div className="mb-3">
            <input type="email" className="form-control authForm" value={credentials.email} name="email" id="email" aria-describedby="emailHelp" onChange={handleChange} required placeholder='Email address'/>
        </div>
        <div className="mb-3">
            <input type="password" className="form-control authForm" value={credentials.password} name="password" id="password" onChange={handleChange} minLength={8} required placeholder='Password'/>
        </div>
        <div className="mb-3">
            <input type="password" className="form-control authForm" value={credentials.cpassword} name="confirmPassword" id="cpassword" onChange={handleChange} minLength={8} required placeholder='Confirm Password'/>
        </div>
        <button type="submit" className="authButton">Sign Up</button>
        </form>
        <div className="credentials">Already have an account?&nbsp;<Link to="/login" className='authLinks'>LOGIN</Link></div>
    </div>
  )
}

export default Signup

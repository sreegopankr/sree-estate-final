import { useState } from "react";
import "./register.scss";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error,SetError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    SetError("");
    setIsLoading(true)
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try{
      const res = await apiRequest.post("/auths/register",{
        username,
        email,
        password
      })
      navigate("/login");
    }catch(err){
      SetError(err.response.data.message);
      setIsLoading(false);
    }finally{
      setIsLoading(false);
    }
    
  }

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" required minLength={3} maxLength={30} type="text" placeholder="Username" />
          <input name="email" required type="text" placeholder="Email" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span> }
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;

import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";
import { AuthContext } from "../../context/AuthContext.jsx";

function Login() {
  const [error,SetError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    SetError("");
    setIsLoading(true)
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try{
      const res = await apiRequest.post("/auths/login",{
        username,
        password
      })
     
      updateUser(res.data);

      navigate("/");
    }catch(err){
      SetError(err.response.data.message);
      setIsLoading(false);
    }finally{
      setIsLoading(false);
    }
    
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={30} type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          { error && <span>{error}</span> }
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
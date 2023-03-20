import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss"
import axios from "axios";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });


  const [err, setErr] = useState(null);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:8800/backend/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  }

  console.log(err)


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          {/*//TODO change h1 and p */}
          <h1>MOG World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>ALready have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form >
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} />
            <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
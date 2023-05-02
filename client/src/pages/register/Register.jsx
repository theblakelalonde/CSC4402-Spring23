import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [blankErr, setblankErr] = useState(false);

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const { currentUser } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      inputs.username != "" &&
      inputs.password != "" &&
      inputs.email != "" &&
      inputs.firstName != "" &&
      inputs.lastName != ""
    ) {
      try {
        await axios.post("http://localhost:8800/backend/auth/register", inputs);

        try {
          await login(inputs);
        } catch (err) {
          setErr(err.response.data);
        }
      } catch (err) {
        setErr(err.response.data);
      }
    } else {
      setblankErr(true);
    }
  };
  if (currentUser) {
    navigate("/");
  }
  console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          {/*//TODO change h1 and p */}
          <h1>MOG</h1>
          <p>
            Track your exercises and find your community of fitness enthusiasts
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            {blankErr && <p>All fields must be filled!</p>}
            <button onClick={handleClick}>Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

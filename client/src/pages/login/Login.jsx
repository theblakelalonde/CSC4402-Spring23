import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [blankErr, setblankErr] = useState(false);

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const { currentUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputs.username != "" && inputs.password != "") {
      try {
        await login(inputs);
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

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>MOG</h1>
          <p>
            Track your exercises and find your community of fitness enthusiasts
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            {blankErr && <p>Both fields must be filled!</p>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

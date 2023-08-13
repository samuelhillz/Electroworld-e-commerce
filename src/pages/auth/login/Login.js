import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import img2 from "../../../assets/login.avif";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <ToastContainer />
      <main className="ctn">
        <img src={img2} alt="" />
        <div className="wrapper">
          <div className="login-ctn">
            <h2>Login</h2>
            <form onSubmit={submit}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-btnn" type="submit">
                Login
              </button>

              <p>-- or -- </p>
            </form>
            <p>
              Don't have an accpunt yet?
              <Link to="/register">
                <span>Register</span>
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

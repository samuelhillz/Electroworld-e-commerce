import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/ecommerce.avif";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../firebase/config";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (email !== password) {
      toast.error("Email and password do not match");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("Registration was successfull");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="register-main">
        <main className="ctn">
          <div className="wrapper">
            <div className="login-ctn">
              <h2>Register</h2>
              <form onSubmit={registerUser}>
                <input
                  type="text"
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
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
                <button className="btn-register">Register</button>
              </form>

              <p className="to-login">
                Already have an acount?
                <Link style={{ textDecoration: "none" }} to="/Login">
                  <span>Login</span>
                </Link>
              </p>
            </div>
          </div>
          <img src={img} alt="" />
        </main>
      </div>
    </>
  );
};

export default Register;

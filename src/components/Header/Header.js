import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  sSET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowLogin, { ShowLogout } from "../hiddenLinks/HiddenLink";
import AdminrRoute from "../adminRoute/AdminrRoute";
import { selectCartTotalQty, totalQuantity } from "../../redux/slice/cartSlice";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [uName, setUName] = useState("");
  const navigate = useNavigate();

  const cartQuantities = useSelector(selectCartTotalQty);
  const dispatch = useDispatch();

  const toggle = () => {
    setShowNav(!showNav);
  };
  const hideMenu = () => {
    setShowNav(false);
  };

  useEffect(() => {
    dispatch(totalQuantity());
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user.email.slice(0, 5));
        setUName(user.email.slice(0, 5));
        dispatch(
          sSET_ACTIVE_USER({
            email: user.email,
            userName: user.email.slice(0, 5),
            userID: user.uid,
          })
        );
      } else {
        setUName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, uName]);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully");
        navigate("/");
      })
      .catch((error) => {});
  };
  return (
    <div className="full ">
      <header className="container">
        <div className="header">
          <div className="logo">
            <Link style={{ textDecoration: "none" }} to="/">
              <h1 className="headerLogo">
                Electro<span>World</span>
              </h1>
            </Link>
          </div>
          <nav className="nav_links" id={showNav ? "show-link" : "hide-link"}>
            <ul className="nav-links">
              <li style={{ textDecoration: "none" }}>
                <AdminrRoute>
                  <NavLink to="/admin">
                    <button
                      style={{ textDecoration: "none" }}
                      className="admin-btn"
                      onClick={hideMenu}
                    >
                      Admin
                    </button>
                  </NavLink>
                </AdminrRoute>
              </li>
              <li style={{ textDecoration: "none" }}>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/"
                  className={activeLink}
                  onClick={hideMenu}
                >
                  Home
                </NavLink>
              </li>
              <li style={{ textDecoration: "none" }}>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/contact"
                  className={activeLink}
                  onClick={hideMenu}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="header-right">
            <span className="links nav-flex">
              <ShowLogout>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                  className={activeLink}
                >
                  Login
                </NavLink>
              </ShowLogout>
              {/* <span className="nav-links">
              <BsFillFilePersonFill />
              <span className="login-link">Hi,{uName}</span>
            </span> */}
            </span>

            <span className="links">
              <ShowLogin>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/"
                  onClick={logoutUser}
                >
                  Logout
                </NavLink>
              </ShowLogin>
            </span>
            <span>
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/cart"
                className={activeLink}
              >
                Cart
                <AiOutlineShoppingCart />
                <span className="cart_num"> {cartQuantities}</span>
              </NavLink>
            </span>
          </div>
          <div onClick={toggle} className="nav-icons">
            {showNav ? (
              <AiOutlineClose size={25} color="black" />
            ) : (
              <AiOutlineMenu size={25} color="black" />
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

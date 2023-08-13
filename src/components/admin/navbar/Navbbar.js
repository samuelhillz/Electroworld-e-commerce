import React from "react";
import "./Navbar.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUserName, userName } from "../../../redux/slice/authSlice";
import { NavLink } from "react-router-dom";

const Navbbar = () => {
  const userName = useSelector(selectUserName);
  const activeLink = ({ isActive }) => {
    return isActive ? "active" : "";
  };
  return (
    <div className="navbaradmin">
      <nav>
        <ul>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/admin/all-products"
              className={activeLink}
            >
              All Product
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/admin/add-product"
              className={activeLink}
            >
              Add Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbbar;

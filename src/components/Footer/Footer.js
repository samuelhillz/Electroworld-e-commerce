import React from "react";
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import {FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <section id="footer">
      <div className="footer container">
        <div className="left-footer">
          <h2 className="footer-logo">
            Electro<span>World</span>
          </h2>
          <p className="footer-info">
           Online store - Shop for your mobile, phones, gadgets and computers.
          </p>
          <span>
            <FaTwitter size={20} />
          </span>
          <span>
            <AiOutlineInstagram size={20} />
          </span>
          <span>
            <AiFillFacebook size={20} />
          </span>
        </div>
        <div>
          <h3>MAKE MONEY WITH US</h3>
          <p>Sell on Electro business</p>
          <p>Sell products</p>
          <p>Sell apps on ElectroUniverse</p>
          <p>Become an affiliate</p>
          <p>Advertise your products</p>
          <p>Self-publish with Us</p>
          <p>Host an Electro Hub</p>
        </div>
        <div>
          <h3>CONTACT</h3>
          <p>1000 Miskolc, Hungary</p>
          <p> +36 20 2804925</p>
          <p>1000 Miskolc, Hungary</p>
          <p>1000 Miskolc, Hungary</p>
        </div>
        <div>
          <h3>PAYMENT METHOD</h3>
          <p>Electro payment Products</p>
          <p>Electro Business card</p>
          <p>Sell apps on ElectroUniverse</p>
          <p>Shop with points</p>
          <p>Reload your balance</p>
          <p>Electro curerncy converter</p>
        </div>
      </div>
      <div className="copyright">
        <hr  />
        <p>© All right reserved. Desiged by Samuel Hillary</p>
      </div>
    </section>
  );
};

export default Footer;

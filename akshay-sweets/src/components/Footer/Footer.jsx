import React from "react";
import "./Footer.css";
import insta from "../../assets/instagram.png";
import git from "../../assets/github.png";
import logo from "../../assets/YAHSKA.png";
export const Footer = () => {
  return (
    <div className="Footer">
      <div className="footerimg">
        <img src={logo} alt="" />
        <p>AKSHAY SWEETS</p>
      </div>
      <ul>
        <li>company</li>
        <li>Products</li>
        <li>offices</li>
        <li>about</li>
        <li>contact</li>
      </ul>
      <div className="social_icon">
        <div className="socialimg">
          <img src={insta} width="40px" alt="" />
        </div>
        <div className="socialimg">
          <img src={git} width="40px" alt="" />
        </div>
      </div>
      <div className="copyright">
      <hr />
        <p>copyright @ 2024 - All rights reserved.</p>
      </div>
    </div>
  );
};

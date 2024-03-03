/* eslint-disable no-unused-vars */
import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_items_icon from "../../assets/light-cart.png";
import list_icon from "../../assets/list.png"
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-items">
          <img src={add_items_icon} width={"30px"} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-items">
          <img width={'30px'} src={list_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;

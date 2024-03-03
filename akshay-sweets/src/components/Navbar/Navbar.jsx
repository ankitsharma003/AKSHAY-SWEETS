import React, { useContext } from "react";
import "./Navbar.css";
import search from "../../assets/dark-search.png";
import cart from "../../assets/light-cart.png";
import userimg from "../../assets/dark-user.png";
import { Link } from "react-router-dom";
import { LoginSignup } from "../../Pages/loginsignup/LoginSignup";
import { ShopContext } from "../context/ShopContext";
export const Navbar = () => {
  const { cartItem } = useContext(ShopContext);
  const totalCount = Object.values(cartItem).reduce((acc, count) => acc + count, 0);
  return (
    <div>
      <nav className="navbar navbar-expand-lg sticky-bottom">
        <div className="container-fluid">
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <a className="navbar-brand">AKSHAY SWEETS</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                  <a className="nav-link active" aria-current="page">
                    Home
                  </a>
                </Link>
              </li>
              <Link style={{ textDecoration: "none", color: "black" }} to="/Offers">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                >
                  Offers
                </a>
              </li>
              </Link>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href={require("../../Pages/Shop")}
                ></a>
              </li> 
            </ul>
            <button type="button" class="btn  margin position-relative">
              <Link to='/LoginSignup' element={<LoginSignup/>} >
              <img src={userimg} width="30px" alt="" />
              </Link>
            </button>
            <button type="button" class="btn  margin position-relative">
              <Link to='/Cart'>
              <img src={cart} width="30px" alt="" />
              </Link>
              <span class="position-absolute top-0 start-100 badge_color translate-middle badge rounded-pill bg-danger">
              {totalCount}
                <span class="visually-hidden">unread messages</span>
              </span>
            </button>
            <div className="search-box">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn " type="submit">
                  <img src={search} width="30px" alt="" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
